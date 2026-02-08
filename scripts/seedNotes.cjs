// Seed script for populating the database with notes
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const NOTES_PATH = path.join(ROOT, 'data', 'notesData.ts');
const ANATOMY_PATH = path.join(ROOT, 'data', 'anatomyNotes.ts');
let esbuild = null;

try {
  esbuild = require(require.resolve('esbuild', {
    paths: [ROOT, path.join(ROOT, '..')]
  }));
} catch {
  esbuild = null;
}

const loadExport = (filePath, exportName) => {
  const source = fs.readFileSync(filePath, 'utf8');
  let jsSource = source;

  if (esbuild) {
    const result = esbuild.transformSync(source, {
      loader: 'ts',
      format: 'cjs',
      target: 'es2019'
    });
    jsSource = result.code;
  } else {
    jsSource = source
      .replace(new RegExp(`export\\s+const\\s+${exportName}\\s*=`), `const ${exportName} =`)
      .replace(/export\\s+default\\s+/g, '')
      .replace(/export\\s+\\{[^}]+\\};?/g, '')
      .replace(/\\s+as const\\b/g, '');
  }

  const context = { module: { exports: {} }, exports: {} };
  vm.runInNewContext(jsSource, context, { filename: filePath });
  return context.module.exports[exportName] || context.exports[exportName];
};

const normalizeSrc = (src = '') => {
  let cleaned = src.trim();
  if (cleaned.startsWith('assets/')) cleaned = `/${cleaned}`;
  return cleaned;
};

const resolveRefImage = (ref) => {
  if (!ref) return '';
  const base = ref.replace(/[^a-z0-9]/gi, '');
  if (!base) return '';
  const candidates = [
    path.join(ROOT, 'public', 'assets', 'osteology', `${base}.png`),
    path.join(ROOT, 'public', 'assets', 'osteology', `${base}.jpg`),
    path.join(ROOT, 'public', 'assets', 'osteology', `${base}.jpeg`)
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const fileName = path.basename(candidate);
      return `/assets/osteology/${fileName}`;
    }
  }
  return '';
};

const collectImageMatches = (content = '') => {
  const matches = [];
  const markdownInline = /!\[([^\]]*)\]\(([^)\n]+)\)/g;
  const markdownRef = /!\[([^\]]+)\]\[([^\]]+)\]/g;
  const htmlImg = /<img[^>]*>/gi;

  let match;
  while ((match = markdownInline.exec(content))) {
    matches.push({ index: match.index, length: match[0].length });
  }
  while ((match = markdownRef.exec(content))) {
    const resolved = resolveRefImage(match[2]);
    if (resolved) {
      matches.push({ index: match.index, length: match[0].length });
    }
  }
  while ((match = htmlImg.exec(content))) {
    const tag = match[0];
    const srcMatch = tag.match(/src=["']([^"']+)["']/i);
    const src = normalizeSrc(srcMatch ? srcMatch[1] : '');
    if (!src) continue;
    matches.push({ index: match.index, length: match[0].length });
  }

  matches.sort((a, b) => a.index - b.index);
  return matches;
};

const replaceImagesWithPlaceholders = (content = '', subjectKey = '', topicKey = '') => {
  const matches = collectImageMatches(content);
  if (matches.length === 0) {
    return content;
  }

  let output = '';
  let last = 0;
  let seq = 1;
  for (const match of matches) {
    output += content.slice(last, match.index);
    output += `[[IMG:${subjectKey}:${topicKey}:${seq}]]`;
    last = match.index + match.length;
    seq += 1;
  }
  output += content.slice(last);

  return output
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\[[^\]]+\]/g, '$1')
    .replace(/^\s*\[[^\]]+\]:\s*\S+\s*$/gm, '')
    .replace(/<https?:\/\/[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n');
};

const buildRecords = () => {
  const NOTES = loadExport(NOTES_PATH, 'NOTES');
  const ANATOMY_NOTES = loadExport(ANATOMY_PATH, 'ANATOMY_NOTES');

  const records = [];

  const dental = NOTES?.dental_materials || {};
  for (const [topicKey, note] of Object.entries(dental)) {
    if (!note || !note.content) continue;
    const isPublic = topicKey === 'impression';
    records.push({
      subject_key: 'dental_materials',
      topic_key: topicKey,
      subject: 'Dental Materials',
      topic: '',
      is_public: isPublic,
      content: replaceImagesWithPlaceholders(note.content, 'dental_materials', topicKey),
      key_points: note.keyPoints || note.key_points || []
    });
  }

  const emb = NOTES?.general_embryology?.summary;
  if (emb?.content) {
    records.push({
      subject_key: 'general_embryology',
      topic_key: 'summary',
      subject: 'General Embryology',
      topic: 'Summary',
      is_public: false,
      content: replaceImagesWithPlaceholders(emb.content, 'general_embryology', 'summary'),
      key_points: emb.keyPoints || emb.key_points || []
    });
  }

  for (const [topicKey, note] of Object.entries(ANATOMY_NOTES || {})) {
    if (!note || !note.content) continue;
    records.push({
      subject_key: 'anatomy',
      topic_key: topicKey,
      subject: 'Anatomy',
      topic: '',
      is_public: false,
      content: replaceImagesWithPlaceholders(note.content, 'anatomy', topicKey),
      key_points: note.keyPoints || note.key_points || []
    });
  }

  return records;
};

const upsertBatch = async (supabaseUrl, supabaseKey, batch) => {
  const url = `${supabaseUrl}/rest/v1/notes?on_conflict=subject_key,topic_key`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(batch)
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || `Supabase insert failed (${res.status})`);
  }
};

const main = async () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
    process.exit(1);
  }

  const records = buildRecords();
  const batchSize = 5;

  console.log(`Seeding ${records.length} notes...`);
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await upsertBatch(supabaseUrl, supabaseKey, batch);
    console.log(`Uploaded ${Math.min(i + batchSize, records.length)}/${records.length}`);
  }
  console.log('Done.');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
