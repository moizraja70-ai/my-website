
import re
import os

input_file = r'c:\Users\b\Downloads\dentedge\osteology .md'
output_file = r'c:\Users\b\Downloads\dentedge\data\osteologyComplete.ts'
img_base = r'/assets/osteology/'

# Read content
with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace images
# ![][image1] -> ![Osteology Image](/assets/osteology/image1.png)
def repl(m):
    return f"![Osteology Image]({img_base}{m.group(1)}.png)"

content = re.sub(r'!\[\]\[(image\w+)\]', repl, content)
content = re.sub(r'!\[.*?\]\[(image\w+)\]', repl, content)

# Escape backticks
ts_content = content.replace('`', '\\`').replace('${', '\\${')

# Write file
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(f"""
export const OSTEOLOGY_COMPLETE_NOTES = `
{ts_content}
`;

export const OSTEOLOGY_COMPLETE_KEY_POINTS = [
  "Comprehensive notes covering all osteology topics.",
  "See detailed content above."
];
""")

print(f"Created {output_file}")
