import zipfile
import re

with zipfile.ZipFile('USMLE_Biochemistry_Dental_Correlations.docx', 'r') as z:
    xml = z.read('word/document.xml').decode('utf-8', errors='ignore')
    text = re.sub(r'<[^>]+>', '\n', xml)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'&lt;', '<', text)
    text = re.sub(r'&gt;', '>', text)
    text = re.sub(r'&quot;', '"', text)
    text = re.sub(r'\n\s*\n', '\n\n', text)
    
with open('extracted.txt', 'w', encoding='utf-8') as f:
    f.write(text.strip())
    
print(f"Extracted {len(text)} characters")
