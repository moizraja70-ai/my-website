const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'physiology');
const targetDir = path.join(__dirname, 'data');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

const files = fs.readdirSync(sourceDir);

files.forEach(file => {
    if (!file.endsWith('.ts')) return;

    const content = fs.readFileSync(path.join(sourceDir, file), 'utf8');

    // 1. Sanitize symbols (smart quotes, etc.)
    let newContent = content
        .replace(/[\u2018\u2019]/g, "'") // Smart single quotes
        .replace(/[\u201C\u201D]/g, '"') // Smart double quotes
        .replace(/\u2013/g, "-") // En-dash
        .replace(/\u2014/g, "--") // Em-dash
        .replace(/\xa0/g, " "); // Non-breaking space

    // 2. Determine new filename and export name
    const baseName = path.basename(file, '.ts');
    const newFileName = baseName + 'Notes.ts';
    const exportName = baseName.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase() + '_NOTES';

    // 3. Write to new location
    fs.writeFileSync(path.join(targetDir, newFileName), newContent);
    console.log(`Migrated ${file} -> ${newFileName}`);

    // 4. Delete old file
    fs.unlinkSync(path.join(sourceDir, file));
});

console.log('Migration complete.');
