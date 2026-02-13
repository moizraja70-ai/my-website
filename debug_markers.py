
import re

input_file = r'c:\Users\b\Downloads\dentedge\osteology .md'
with open(input_file, 'r', encoding='utf-8') as f:
    full_content = f.read()

markers = [
    (r'#\s*MANDIBLE', "MANDIBLE"),
    (r'\*\*Maxilla', "MAXILLA_SHORT"),
    (r'\*\*Zygomatic\s*Bone', "ZYGOMATIC"),
    (r'#\s*\*\*sphenoid\s*bone\*\*', "SPHENOID"),
    (r'#\s*\*\*Ethmoid\s*bone\*\*', "ETHMOID"),
    (r'Foramina\s*&\s*Fossae', "FORAMINA_SHORT") # Relaxed
]

for pattern, name in markers:
    match = re.search(pattern, full_content, re.IGNORECASE)
    if match:
        print(f"Found {name} at {match.start()}: {match.group(0)!r}")
        # Print context
        start = match.start()
        print(f"Context: {full_content[max(0, start-20):min(len(full_content), start+50)]!r}")
    else:
        print(f"NOT FOUND: {name} (Pattern: {pattern})")
