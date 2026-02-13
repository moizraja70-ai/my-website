
import re
import os

# Define the input file path
input_file = r'c:\Users\b\Downloads\dentedge\osteology .md'
output_dir = r'c:\Users\b\Downloads\dentedge\data'

# Read the full content
with open(input_file, 'r', encoding='utf-8') as f:
    full_content = f.read()

# 1. Replace image references
image_dir = r'c:\Users\b\Downloads\dentedge\my-website\public\assets\osteology'
try:
    image_files = os.listdir(image_dir)
except FileNotFoundError:
    image_files = []

image_map = {}
for img in image_files:
    base = os.path.splitext(img)[0]
    image_map[base] = img

def precise_image_replacer(match):
    img_id = match.group(1)
    if img_id in image_map:
        return f'![Osteology Image](/assets/osteology/{image_map[img_id]})'
    if '.' in img_id:
         return f'![Osteology Image](/assets/osteology/{img_id})'
    return f'![Osteology Image](/assets/osteology/{img_id}.png)'

# Replace ![][imageX] or ![imageX]
full_content = re.sub(r'!\[\]\[(image\w+)\]', precise_image_replacer, full_content)
full_content = re.sub(r'!\[(.*?)\]\[(image\w+)\]', precise_image_replacer, full_content)

# 2. Split content using regex for robustness
# Format: (Regex Pattern, Output Filename, Export Variable Prefix)
markers = [
    (r'#\s*MANDIBLE', "osteologyMandible.ts", "MANDIBLE"),
    # Match "**Maxilla — Anatomy" or "**Maxilla - Anatomy" or "**Maxilla – Anatomy"
    (r'\*\*Maxilla\s*.\s*Anatomy', "osteologyMaxilla.ts", "MAXILLA"),
    # Match "**Zygomatic Bone (Cheekbone)"
    (r'\*\*Zygomatic\s*Bone\s*\(Cheekbone\)', "osteologyZygomatic.ts", "ZYGOMATIC"),
    (r'#\s*\*\*sphenoid\s*bone\*\*', "osteologySphenoid.ts", "SPHENOID"),
    (r'#\s*\*\*Ethmoid\s*bone\*\*', "osteologyEthmoid.ts", "ETHMOID"),
    (r'#\s*Foramina\s*&\s*Fossae', "osteologyForaminaFossae.ts", "FORAMINA_FOSSAE")
]

indices = []
for pattern, filename, var_prefix in markers:
    match = re.search(pattern, full_content, re.IGNORECASE)
    if match:
        indices.append((match.start(), match.group(0), filename, var_prefix))
    else:
        print(f"Warning: Marker pattern '{pattern}' not found!")

# Sort by index
indices.sort(key=lambda x: x[0])

# Debugging sort order
print("Found markers in order:")
for idx, marker, filename, _ in indices:
    print(f"  {idx}: {marker} -> {filename}")

splits = []
start_idx = 0
skull_filename = "osteologySkullBonesSutures.ts"
skull_prefix = "SKULL_BONES_SUTURES"

for i in range(len(indices)):
    idx, marker_text, filename, var_prefix = indices[i]
    
    # Previous section
    content = full_content[start_idx:idx].strip()
    
    # Determine which file this content belongs to
    if i == 0:
        current_filename = skull_filename
        current_prefix = skull_prefix
    else:
        _, _, current_filename, current_prefix = indices[i-1]
        
    splits.append((current_filename, current_prefix, content))
    start_idx = idx

# Last section
if indices:
    _, _, last_filename, last_prefix = indices[-1]
    content = full_content[start_idx:].strip()
    splits.append((last_filename, last_prefix, content))
else:
    splits.append((skull_filename, skull_prefix, full_content))

# 3. Write files
for filename, var_prefix, content in splits:
    # Escape backticks for TS string
    ts_content = content.replace('`', '\\`').replace('${', '\\${')
    
    file_content = f"""
export const {var_prefix}_NOTES = `
{ts_content}
`;

export const {var_prefix}_KEY_POINTS = [
  "See detailed notes above."
];
"""
    with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as f:
        f.write(file_content)
    print(f"Created {filename}")
