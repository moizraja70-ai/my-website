
import re
import os

input_file = r'c:\Users\b\Downloads\dentedge\temp_osteology_v2\osteology.html'
output_file = r'c:\Users\b\Downloads\dentedge\data\osteologyHTML.ts'
img_base = r'/assets/osteology/'

# Read HTML content
with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace image paths
# Pattern: src="images/image00.png" -> src="/assets/osteology/image00.png"
# HTML export from Google Docs usually puts images in a folder named "images"
content = re.sub(r'src="images/([^"]+)"', f'src="{img_base}\\1"', content)

# Escape backticks and ${} for template literal
ts_content = content.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

# Write to TS file
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(f"""
export const OSTEOLOGY_HTML_CONTENT = `
{ts_content}
`;
""")

print(f"Created {output_file}")
