
const fs = require('fs');
const path = require('path');

const sourceFile = 'Denture Cleansers and Denture Adhesives — Detailed Exam Notes.md';
const outputDir = 'public/assets/denture/';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    let content = fs.readFileSync(sourceFile, 'utf8');
    // Match both [image1]: <base64> and [image1]: base64 formats
    const imageRegex = /\[image(\d+)\]:\s*<?data:image\/[a-zA-Z]+;base64,([^>\s]+)>?/g;
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
