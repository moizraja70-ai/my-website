
import re

def parse_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by H2 headers (##)
    sections = re.split(r'^##\s+(.+)$', content, flags=re.MULTILINE)
    
    # sections[0] is intro before first ##
    # sections[1] is first title, sections[2] is first content
    # sections[3] is second title, sections[4] is second content, etc.
    
    parsed_sections = {}
    
    # Process intro if needed, but likely we want the named sections
    
    for i in range(1, len(sections), 2):
        title = sections[i].strip().replace('**', '').replace('\\', '').strip()
        body = sections[i+1].strip()
        
        # Clean up image references
        # Convert ![][imageX] to ![Image](/assets/osteology/imageX.png)
        # Regex for ![][imageX] or ![imageX]
        
        def image_replacer(match):
            img_id = match.group(1)
            # define mappings if needed, but assuming standard format
            # based on file copy "image1" -> image1.png
            return f'![Osteology Image](/assets/osteology/{img_id}.png)'

        # Matches ![][image47]
        body = re.sub(r'!\[\]\[(image\d+)\]', image_replacer, body)
        # Matches ![][image47.png] potentially?
        
        # Remove the reference definitions at the end if they exist or just ignore them since we replaced the calls
        
        parsed_sections[title] = body
        
    return parsed_sections

# Map sections to specific filenames/const names
mapping = {
    "1) Skull bones (big picture)": "SKULL_BONES_SUTURES",
    "2) Sutures you must know (the “core 4” + 1 dangerous point)": "SKULL_BONES_SUTURES", # Combine?
    "3) ANTERIOR view: bones + landmarks (what you see from the front)": "SKULL_BONES_SUTURES",
    "4) LATERAL view: bones + sutures + landmarks": "SKULL_BONES_SUTURES",
    "5) POSTERIOR view: bones + sutures + landmarks": "SKULL_BONES_SUTURES",
    "6) SUPERIOR view: bones + sutures": "SKULL_BONES_SUTURES",
    "7) Cranial fossae (inside skull with calvaria removed)": "SKULL_BONES_SUTURES",
    "8) INFERIOR (skull base) view: major landmarks + “what passes”": "SKULL_BONES_SUTURES",
    "9) Super quick “WHAT” questions": "SKULL_BONES_SUTURES",
    
    "MANDIBLE": "MANDIBLE", # Note: H1 in md
    "Mandible: parts": "MANDIBLE",
    "Key landmarks": "MANDIBLE",
    "Foramina + what passes": "MANDIBLE",
    "Muscle attachments ![][image18]": "MANDIBLE",
    "TMJ basics (quick)": "MANDIBLE",
    "2) EMBRYOLOGY (High-Yield)(detailed in oral histology quick revision for mcq  )": "MANDIBLE",
    "1. Common Sites & Frequency": "MANDIBLE", # Fractures
    "2. Key Symptoms & Signs (The \"Look and Feel\")": "MANDIBLE",
    "3. Condylar Fractures: Mechanisms & Deviation": "MANDIBLE",
    "4. Muscle Pull: Favorable vs. Unfavorable": "MANDIBLE",
    "5. Classification Terms": "MANDIBLE",
    "6. Imaging Strategy": "MANDIBLE",
    
    "MAXILLA": "MAXILLA", # Check content for H1
    "Zygomatic Bone (Cheekbone) — Detailed, High-Yield Notes": "ZYGOMATIC", # H1/Bold text? in file it was text line 1604
    
    "sphenoid bone": "SPHENOID", # H1
    
    "Ethmoid bone": "ETHMOID", # H1
    
    "Foramina & Fossae of the Head and Neck (Exam Notes + Visual Orientation)": "FORAMINA_FOSSAE"
}

# Actually, the file structure is a bit mixed with H1 (#) and H2 (##). 
# Let's adjust the script to handle the full file content and create specific output files.

full_content = ""
with open(r'c:\Users\b\Downloads\dentedge\osteology .md', 'r', encoding='utf-8') as f:
    full_content = f.read()

# Replace image refs first globally
def global_image_replacer(match):
    img_id = match.group(1)
    return f'![Osteology Image](/assets/osteology/{img_id})'

# The zip extraction showed images with extensions (png/jpg). 
# I need to match valid file names. 
# Let's read the directory of images to get a map of imageID -> filename

import os
image_dir = r'c:\Users\b\Downloads\dentedge\my-website\public\assets\osteology'
image_files = os.listdir(image_dir)
image_map = {}
for img in image_files:
    # key = image1, val = image1.png
    base = os.path.splitext(img)[0]
    image_map[base] = img

def precise_image_replacer(match):
    img_id = match.group(1)
    if img_id in image_map:
        return f'![Osteology Image](/assets/osteology/{image_map[img_id]})'
    return f'![Osteology Image](/assets/osteology/{img_id}.png)' # Fallback

full_content = re.sub(r'!\[\]\[(image\d+)\]', precise_image_replacer, full_content)


# Strategy: Split content into chunks based on "Subject" keywords
# I will regex for the major headers which seem to be H1 (#)

# 1. Skull Bones & Sutures (Everything before # MANDIBLE)
# 2. Mandible (# MANDIBLE ... # Zygomatic? No, Zygomatic is just text bold line 1604? No, check line 1600+ )
# Line 1604: **Zygomatic Bone (Cheekbone) — Detailed, High-Yield Notes**
# Line 1833: # **sphenoid bone**
# Line 2009: # **Ethmoid bone** 
# Line 2075: # Foramina & Fossae of the Head and Neck (Exam Notes + Visual Orientation)

# Constants to generate
files_to_create = {
    "data/osteologySkullBonesSutures.ts": ["SKULL_BONES_SUTURES_NOTES", "SKULL_BONES_SUTURES_KEY_POINTS"],
    "data/osteologyMandible.ts": ["MANDIBLE_NOTES", "MANDIBLE_KEY_POINTS"],
    "data/osteologyMaxilla.ts": ["MAXILLA_NOTES", "MAXILLA_KEY_POINTS"],
    "data/osteologyZygomatic.ts": ["ZYGOMATIC_NOTES", "ZYGOMATIC_KEY_POINTS"],
    "data/osteologySphenoid.ts": ["SPHENOID_NOTES", "SPHENOID_KEY_POINTS"],
    "data/osteologyEthmoid.ts": ["ETHMOID_NOTES", "ETHMOID_KEY_POINTS"],
    "data/osteologyForaminaFossae.ts": ["FORAMINA_FOSSAE_NOTES", "FORAMINA_FOSSAE_KEY_POINTS"],
}

# Extraction logic
# Skull: Start to "# MANDIBLE"
# Mandible: "# MANDIBLE" to "**Maxilla (Upper Jaw) — Detailed Notes**" (Need to find where Maxilla starts)
# Maxilla: Search for Maxilla header. Line 1367? Wait, I didn't see Maxilla header in the grep output earlier.
# Let's inspect content around line 1360 in next step or assume based on "Zygomatic"

pass
