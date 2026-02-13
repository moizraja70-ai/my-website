
const fs = require('fs');

const sourceFile = 'Denture Cleansers and Denture Adhesives — Detailed Exam Notes.md';
const outputFile = 'denture_content_processed.md';

try {
    const content = fs.readFileSync(sourceFile, 'utf8');

    // 1. Replace reference-style image calls like ![][image1] with direct links
    let processed = content.replace(/!\[\]\[image(\d+)\]/g, (match, id) => {
        return `![image${id}](assets/denture/image${id}.png)`;
    });

    // 2. Remove the base64 definitions at the end of the file: [image1]: <data:image...
    processed = processed.replace(/\[image(\d+)\]:\s*<?data:image\/[a-zA-Z]+;base64,[^>\s]+>?/g, '');

    fs.writeFileSync(outputFile, processed, 'utf8');
    console.log('Successfully processed content.');
} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
