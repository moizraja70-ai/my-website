const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const NOTES_PATH = path.join(ROOT, 'data', 'notesData.ts');
const ANATOMY_PATH = path.join(ROOT, 'data', 'anatomyNotes.ts');
const PARENT_DATA = path.join(ROOT, '..', 'data');
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
      content: note.content,
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
      content: emb.content,
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
      content: note.content,
      key_points: note.keyPoints || note.key_points || []
    });
  }

  // --- Physiology (12 separate files) ---
  const physiologyFiles = [
    { file: 'generalPhysiologyNotes.ts', exportName: 'GENERAL_PHYSIOLOGY_NOTES', key: 'general_physiology', topic: 'General Physiology' },
    { file: 'cellMembraneTransportNotes.ts', exportName: 'CELL_MEMBRANE_TRANSPORT_NOTES', key: 'cell_membrane_transport', topic: 'Cell Membrane Transport' },
    { file: 'nervePhysiologyNotes.ts', exportName: 'NERVE_PHYSIOLOGY_NOTES', key: 'nerve_physiology', topic: 'Nerve Physiology' },
    { file: 'musclePhysiologyNotes.ts', exportName: 'MUSCLE_PHYSIOLOGY_NOTES', key: 'muscle_physiology', topic: 'Muscle Physiology' },
    { file: 'muscleMechanicsNotes.ts', exportName: 'MUSCLE_MECHANICS_NOTES', key: 'muscle_mechanics', topic: 'Muscle Mechanics' },
    { file: 'cardiacMuscleNotes.ts', exportName: 'CARDIAC_MUSCLE_NOTES', key: 'cardiac_muscle', topic: 'Cardiac Muscle' },
    { file: 'cardiovascularPhysiologyNotes.ts', exportName: 'CARDIOVASCULAR_PHYSIOLOGY_NOTES', key: 'cardiovascular_physiology', topic: 'Cardiovascular Physiology' },
    { file: 'respiratoryPhysiologyNotes.ts', exportName: 'RESPIRATORY_PHYSIOLOGY_NOTES', key: 'respiratory_physiology', topic: 'Respiratory Physiology' },
    { file: 'renalPhysiologyNotes.ts', exportName: 'RENAL_PHYSIOLOGY_NOTES', key: 'renal_physiology', topic: 'Renal Physiology' },
    { file: 'giPhysiologyNotes.ts', exportName: 'GI_PHYSIOLOGY_NOTES', key: 'gi_physiology', topic: 'GI Physiology' },
    { file: 'neurophysiologyNotes.ts', exportName: 'NEUROPHYSIOLOGY_NOTES', key: 'neurophysiology', topic: 'Neurophysiology' },
    { file: 'endocrinologyNotes.ts', exportName: 'ENDOCRINOLOGY_NOTES', key: 'endocrinology', topic: 'Endocrinology' },
  ];

  for (const { file, exportName, key, topic } of physiologyFiles) {
    try {
      const pPath = path.join(PARENT_DATA, file);
      if (fs.existsSync(pPath)) {
        const noteData = loadExport(pPath, exportName);
        // The file exports a single object { title, content, keyPoints, mcqs }
        // It does NOT export { [key]: { content... } }
        // So we use noteData directly.
        if (noteData && noteData.content) {
          records.push({
            subject_key: 'physiology',
            topic_key: key,
            subject: 'Physiology',
            topic: topic,
            is_public: false,
            content: noteData.content,
            key_points: noteData.keyPoints || noteData.key_points || []
          });
        }
      } else {
        console.warn(`Skipping ${file}: not found`);
      }
    } catch (err) {
      console.warn(`Error loading ${file}:`, err.message);
    }
  }

  // --- Anatomy sub-topics (separate files in parent data/ directory) ---
  const anatomyExtras = [
    { filePath: path.join(PARENT_DATA, 'cranialNervesNotes.ts'), exportName: 'CRANIAL_NERVES_NOTES', topicKey: 'cranial_nerves' },
    { filePath: path.join(PARENT_DATA, 'headNeckMusclesNotes.ts'), exportName: 'HEAD_NECK_MUSCLES_NOTES', topicKey: 'head_neck_muscles' },
    { filePath: path.join(PARENT_DATA, 'triangleNeckNotes.ts'), exportName: 'TRIANGLE_NECK_NOTES', topicKey: 'triangle_neck' },
    { filePath: path.join(PARENT_DATA, 'larynxThyroidNotes.ts'), exportName: 'LARYNX_THYROID_NOTES', topicKey: 'larynx_thyroid' },
  ];

  for (const { filePath, exportName, topicKey } of anatomyExtras) {
    try {
      if (!fs.existsSync(filePath)) { console.warn(`Skipping ${exportName}: file not found`); continue; }
      const data = loadExport(filePath, exportName);
      const note = data?.overview;
      if (!note || !note.content) continue;
      records.push({
        subject_key: 'anatomy',
        topic_key: topicKey,
        subject: 'Anatomy',
        topic: '',
        is_public: false,
        content: note.content,
        key_points: note.keyPoints || note.key_points || []
      });
    } catch (err) {
      console.warn(`Skipping ${exportName}:`, err.message);
    }
  }

  // --- Tooth Morphology ---
  try {
    const tmPath = path.join(PARENT_DATA, 'toothMorphologyNotes.ts');
    if (fs.existsSync(tmPath)) {
      const TOOTH_MORPHOLOGY_NOTES = loadExport(tmPath, 'TOOTH_MORPHOLOGY_NOTES');
      const tmNote = TOOTH_MORPHOLOGY_NOTES?.overview;
      if (tmNote?.content) {
        records.push({
          subject_key: 'tooth_morphology',
          topic_key: 'overview',
          subject: 'Tooth Morphology',
          topic: 'Overview',
          is_public: false,
          content: tmNote.content,
          key_points: tmNote.keyPoints || tmNote.key_points || []
        });
      }
    }
  } catch (err) {
    console.warn('Skipping TOOTH_MORPHOLOGY_NOTES:', err.message);
  }

  // --- General Pathology ---
  try {
    const gpPath = path.join(PARENT_DATA, 'generalPathologyNotes.ts');
    if (fs.existsSync(gpPath)) {
      const GENERAL_PATHOLOGY_NOTES = loadExport(gpPath, 'GENERAL_PATHOLOGY_NOTES');
      const gpNote = GENERAL_PATHOLOGY_NOTES?.summary;
      if (gpNote?.content) {
        records.push({
          subject_key: 'general_pathology',
          topic_key: 'summary',
          subject: 'General Pathology',
          topic: 'Summary',
          is_public: false,
          content: gpNote.content,
          key_points: gpNote.keyPoints || gpNote.key_points || []
        });
      }
    }
  } catch (err) {
    console.warn('Skipping GENERAL_PATHOLOGY_NOTES:', err.message);
  }

  // --- Community Medicine ---
  try {
    const cmPath = path.join(PARENT_DATA, 'communityMedicineNotes.ts');
    if (fs.existsSync(cmPath)) {
      const COMMUNITY_MEDICINE_NOTES = loadExport(cmPath, 'COMMUNITY_MEDICINE_NOTES');
      const cmNote = COMMUNITY_MEDICINE_NOTES?.summary;
      if (cmNote?.content) {
        records.push({
          subject_key: 'community_medicine',
          topic_key: 'summary',
          subject: 'Community Medicine',
          topic: 'Summary',
          is_public: false,
          content: cmNote.content,
          key_points: cmNote.keyPoints || cmNote.key_points || []
        });
      }
    }
  } catch (err) {
    console.warn('Skipping COMMUNITY_MEDICINE_NOTES:', err.message);
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
    console.log(`Uploading batch ${i} - ${i + batchSize}...`);
    try {
      await upsertBatch(supabaseUrl, supabaseKey, batch);
      console.log(`Uploaded ${Math.min(i + batchSize, records.length)}/${records.length}`);
    } catch (e) {
      console.log("ERROR IN BATCH:", e);
      throw e;
    }
  }
  console.log('Done.');
};

main().catch(async (err) => {
  console.log("FATAL ERROR:");
  console.log(err);
  if (err.message) console.log(err.message);
  if (err.response) {
    try {
      console.log(await err.response.text());
    } catch (e) {
      console.log("Could not read response text");
    }
  }
  process.exit(1);
});
