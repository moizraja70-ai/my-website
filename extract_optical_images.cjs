
const fs = require('fs');
const path = require('path');

const sourceFile = process.argv[2];
const outputDir = process.argv[3];

if (!sourceFile || !outputDir) {
    console.log('Usage: node extract_optical_images.js <source_file> <output_dir>');
    process.exit(1);
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    let content = fs.readFileSync(sourceFile, 'utf8');
    const imageRegex = /\[image(\d+)\]:\s*<data:image\/png;base64,([^>]+)>/g;
    let match;
    let count = 0;

    while ((match = imageRegex.exec(content)) !== null) {
        const imageId = match[1];
        const base64Data = match[2];
        const fileName = `image${imageId}.png`;
        const checkFilePath = path.join(outputDir, fileName);

        // Write image file
        fs.writeFileSync(checkFilePath, base64Data, 'base64');
        console.log(`Saved ${fileName}`);

        count++;
    }

    console.log(`Extracted ${count} images.`);

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
