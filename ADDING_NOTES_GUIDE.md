# Adding New Notes to DentEdge

Step-by-step guide for adding new anatomy/subject topics with images and styled content.

---

## Recommended Workflow (Supabase First, Local Bundle Second)

If you want to reduce content being shipped in the frontend bundle (and keep behavior consistent across local/preview/production), use this order:

1. Add/Update the note in **Supabase** first (recommended for most content).
2. Only after it is correct, optionally copy a condensed/offline version into the **local bundle**.

Why:
- Bundled notes (`data/*.ts`) are downloaded by every user, so they are easy to copy.
- Supabase notes can be served via `/api/notes` (server-side) with your access rules (login/subscription), which is harder to scrape.

Supabase keys to use (example):
- `subject_key`: `general_pathology`
- `topic_key`: `general_patho_overview`

The app generates these slugs in `services/notesService.ts` (`subjectToSlug()` and `topicToSlug()`), and can map mismatches via `TOPIC_ALIASES`.

---

## 1. Prepare Source Files

You need:
- **Google Docs export** (HTML + images ZIP) — OR — a clean **Markdown file** with images
- Images should be in a folder (PNG/JPG)

### Important: Image Order Problem

Google Docs exports number images by **insertion order**, NOT by appearance order in the document.
For example, the first image visible in the doc might be `image5.png`, not `image1.png`.

**Always check the HTML to get the real image order:**

```python
import zipfile, re
z = zipfile.ZipFile('YourNotes.zip')
html = z.read('YourNotes.html').decode('utf-8')
imgs = re.findall(r'<img[^>]*src="images/(image\d+\.\w+)"', html)
for i, img in enumerate(imgs, 1):
    print(f'  Position {i} in document -> {img}')
```

If your markdown uses sequential `image1, image2, ...` but the HTML doesn't, you must remap them.

---

## 2. Extract Images

Put images in `public/assets/<topic-folder>/`:

```python
import zipfile, os
z = zipfile.ZipFile('YourNotes.zip')
dest = 'public/assets/your-topic-name'
os.makedirs(dest, exist_ok=True)
for name in z.namelist():
    if name.startswith('images/') and not name.endswith('/'):
        data = z.read(name)
        fname = os.path.basename(name)
        with open(os.path.join(dest, fname), 'wb') as f:
            f.write(data)
```

---

## 3. Create the Notes TypeScript File

Create `data/yourTopicNotes.ts` following this structure:

```typescript
export const YOUR_TOPIC_NOTES: Record<string, { content: string; keyPoints: string[] }> = {
  overview: {
    content: String.raw`
# Your Topic Title

Your markdown content here...

![](/assets/your-topic-name/image5.png)

More content...

| Column 1 | Column 2 |
| --- | --- |
| Data | Data |

`,
    keyPoints: [
      "Key point 1",
      "Key point 2",
      "Key point 3"
    ]
  }
};
```

### Rules

- **Single `overview` section** — the app only loads one section per topic
- Use `String.raw` backtick template — this preserves backslashes and special chars
- Image paths: `![](/assets/your-topic-name/imageN.png)` — use the **actual filename** from the ZIP, not sequential numbers
- Escape any backticks in content with `\``
- Escape `${` with `\${`
- Tables use standard markdown: `| col | col |` with `| --- | --- |` separator

---

## 4. Add Styled Callout Boxes

The app uses `react-markdown` with `rehype-raw`, so raw HTML works inside the markdown.

### Box Styles

**Blue (tips, memory hooks, study aids):**
```html
<div style="background:#e8f4fd;border-left:4px solid #1a73e8;border-radius:8px;padding:16px 20px;margin:16px 0;">

**Your heading here:**

- Bullet point 1
- Bullet point 2

</div>
```

**Green (key concepts, rules):**
```html
<div style="background:#e6f4ea;border-left:4px solid #1e8e3e;border-radius:8px;padding:16px 20px;margin:16px 0;">

**Important rule:**

Content here.

</div>
```

**Amber/Yellow (clinical tips, dentistry links):**
```html
<div style="background:#fef7e0;border-left:4px solid #f9ab00;border-radius:8px;padding:16px 20px;margin:16px 0;">

**Clinical tip:**

- Point 1
- Point 2

</div>
```

**Red (exam-critical, must-know):**
```html
<div style="background:#fce8e6;border-left:4px solid #d93025;border-radius:8px;padding:16px 20px;margin:16px 0;">

**Exam favorite:**

Critical content here.

</div>
```

### Important

- Leave a **blank line** after the opening `<div>` tag and before `</div>`
- Markdown (bold, lists, etc.) works inside the div as long as there are blank lines separating HTML and markdown

---

## 5. Register the Topic in constants.tsx

Add your topic name to the `SUBJECT_TOPICS` array:

```typescript
// In constants.tsx
[MedicalSubject.ANATOMY]: [
    { parent: "Osteology + Fractures", children: [...] },
    "Cranial Nerves",
    "Head and Neck Muscles",
    "Your New Topic"        // <-- add here
],
```

---

## 6. Update geminiService.ts

Two changes needed:

### A. Topic Detection in `resolveAnatomyTopicKey()`

Add a check so the app can identify your topic from its name:

```typescript
// Around line 358-390 in geminiService.ts
const resolveAnatomyTopicKey = (topic?: string) => {
  const t = normalize(topic || '');
  if (!t) return null;
  // ... existing checks ...
  if (t.includes('your keyword')) return 'your_topic_key';
  // ...
};
```

### B. Notes Loading in `getLocalFallbackNotes()`

Add a block to import and serve your notes (after the existing cranial nerves / head neck muscles blocks):

```typescript
// Inside getLocalFallbackNotes(), in the anatomy section
const t = normalize(topic || '');
const isYourTopic = t.includes('your keyword');

if (isYourTopic) {
  const mod = await import('../data/yourTopicNotes');
  const note = (mod as any).YOUR_TOPIC_NOTES?.['overview'];
  if (!note || typeof note.content !== 'string') return null;
  const keyPoints = Array.isArray(note.keyPoints) ? note.keyPoints : [];
  return { content: injectNoteImages(note.content), keyPoints };
}
```

---

## 7. Verify

1. **TypeScript check:** `npx tsc --noEmit` — look for errors in your files only (other pre-existing errors can be ignored)
2. **Dev server:** `npm run dev` — navigate to your topic and confirm:
   - Content loads
   - Images display correctly and in right order
   - Tables render properly
   - Callout boxes show with colored backgrounds
   - Key points appear in the "Quick Pearls" section

---

## File Structure Reference

```
dentedge/
├── data/
│   ├── cranialNervesNotes.ts      # Cranial Nerves notes
│   ├── headNeckMusclesNotes.ts    # Head & Neck Muscles notes
│   ├── anatomyNotes.ts            # Osteology notes (existing)
│   └── yourTopicNotes.ts          # Your new topic
├── public/
│   └── assets/
│       ├── cranialnerves/         # 25 images
│       ├── head-neck-muscles/     # 19 images
│       └── your-topic-name/       # Your images
├── services/
│   └── geminiService.ts           # Topic routing + notes loading
├── constants.tsx                   # Topic list in sidebar
└── ADDING_NOTES_GUIDE.md          # This file
```

---

## Quick Checklist

- [ ] Images extracted to `public/assets/<folder>/`
- [ ] Image order verified against HTML (not assumed sequential)
- [ ] `data/<topic>Notes.ts` created with `overview` section
- [ ] Callout boxes added for tips, rules, clinical notes
- [ ] Topic added to `constants.tsx` SUBJECT_TOPICS array
- [ ] `resolveAnatomyTopicKey()` updated in geminiService.ts
- [ ] `getLocalFallbackNotes()` updated with import block
- [ ] `npx tsc --noEmit` passes for your files
- [ ] Tested in browser — content, images, tables, boxes all render

---

## Agent Workflow (for Claude / AI assistants)

When asked to add a new topic, follow this exact sequence:

### Step 1: Identify source files

- User provides a **Google Docs ZIP** (HTML + images) and/or a **Markdown file**.
- If ZIP provided, extract and read the HTML to get the **real image order** (see Section 1).

### Step 2: Build the image mapping

Google Docs image filenames are **NOT sequential** by appearance. You MUST:

1. Parse the HTML from the ZIP: extract `<img src="images/imageN.ext">` tags in order.
2. Parse the Markdown: note where `image1`, `image2`, etc. appear sequentially.
3. Build a mapping: `Markdown position 1 → actual HTML filename (e.g. image5.png)`.
4. Use the **actual HTML filenames** in the final TypeScript file, not the markdown sequential names.

```python
# Quick mapping script
import zipfile, re
z = zipfile.ZipFile('YourNotes.zip')
html = z.read('YourNotes.html').decode('utf-8')
html_order = re.findall(r'<img[^>]*src="images/(image\d+\.\w+)"', html)
for pos, real_name in enumerate(html_order, 1):
    print(f'  Markdown image{pos} → use {real_name}')
```

### Step 3: Extract images to `public/assets/<topic-folder>/`

Copy all image files from the ZIP into the correct folder. Keep original filenames.

### Step 4: Create `data/<topic>Notes.ts`

- Use `String.raw` backtick template for the content.
- Single `overview` key only.
- Replace markdown image references with the **mapped actual filenames**.
- Add 5–10 `keyPoints` summarizing the most exam-relevant facts.

### Step 5: Add styled callout boxes

Wrap key tips, rules, clinical notes, and exam-critical content in colored `<div>` boxes (see Section 4 for color codes).

**CRITICAL — blank line rule:**

```
WRONG (markdown won't render):          CORRECT (markdown renders):
<div style="...">                       <div style="...">
**Bold text**
- bullet                               **Bold text**
</div>
                                        - bullet

                                        </div>
```

You MUST have a **blank line** after `<div ...>` and before `</div>`. Without it, `react-markdown` treats the content as raw HTML text and `**bold**`, `- bullets`, etc. show as literal characters instead of rendering.

**After generating all boxes, run this fix script** to ensure no blank lines were missed:

```python
import re
def fix_div_blanks(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    text = re.sub(r'(<div\s[^>]*>)\n(?!\n)', r'\1\n\n', text)
    text = re.sub(r'(?<!\n)\n</div>', r'\n\n</div>', text)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)
fix_div_blanks('data/yourTopicNotes.ts')
```

### Step 6: Register the topic

1. Add topic name to `SUBJECT_TOPICS` array in `constants.tsx`.
2. Add topic detection in `resolveAnatomyTopicKey()` in `geminiService.ts`.
3. Add import block in `getLocalFallbackNotes()` in `geminiService.ts`.

### Step 7: Handle Unicode gotchas

Google Docs exports often contain invisible Unicode characters that break regex/string matching:

| Character | What it looks like | Python escape | Fix |
| --- | --- | --- | --- |
| Non-breaking space | normal space | `\xa0` | Use `.` or `\s` in regex instead of literal space |
| Right single quote | `'` (curly) | `\u2019` | Match with `\u2019` or `.` wildcard |
| Left/right double quotes | `"` `"` (curly) | `\u201c` `\u201d` | Match with `.` wildcard |
| Em dash | `—` | `\u2014` | Use `\u2014` or `—` in source |

When writing Python scripts that process these files on Windows, use `python -X utf8` to avoid `cp1252` encoding errors.

### Step 8: Verify

1. `npx tsc --noEmit` — check for TypeScript errors in your new files.
2. `npm run dev` — open the topic in browser and verify:
   - Content loads and text is readable
   - All images display in correct order
   - Tables render with proper columns
   - Callout boxes show colored backgrounds with **bold** and bullets rendered (not raw `**` characters)
   - Key points appear in "Quick Pearls" section
