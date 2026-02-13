
import re

html_ts_path = r'c:\Users\b\Downloads\dentedge\data\osteologyHTML.ts'

with open(html_ts_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "export const OSTEOLOGY_HTML_CONTENT = `"
end_marker = "`;"
start_idx = content.find(start_marker) + len(start_marker)
end_idx = content.rfind(end_marker)
html_content = content[start_idx:end_idx]

patterns = [
    (r'Skull bones', 'SKULL'),
    (r'Sutures you must know', 'SUTURES'),
    (r'Mandible', 'MANDIBLE'),
    (r'Maxilla', 'MAXILLA'),
    (r'Zygomatic', 'ZYGOMATIC'),
    (r'Sphenoid', 'SPHENOID'),
    (r'Ethmoid', 'ETHMOID'),
    (r'Foramina & Fossae', 'FORAMINA')
]

for p, name in patterns:
    print(f"--- Matches for {name} ---")
    for match in re.finditer(p, html_content, re.IGNORECASE):
        start = match.start()
        # Print context: 50 chars before and after
        context = html_content[max(0, start-100):min(len(html_content), start+100)].replace('\n', ' ')
        print(f"Index: {start} | Context: ...{context}...")
