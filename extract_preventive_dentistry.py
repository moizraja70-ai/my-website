import PyPDF2
import re
import sys

pdf_path = r"C:\Users\b\.kimi\sessions\abc04135a4d2047f4ffb7df61f21fee1\509dfe12-00cc-4b7a-a1a2-4dfec2bb0c50\uploads\Textbook of Preventive and Community Dentistry  PDFDrive _819_d07daa.pdf"

target_sections = [
    "SECTION B: EPIDEMIOLOGY",
    "SECTION C: INFECTION CONTROL",
    "Indices for Oral Diseases",
    "SECTION E: PREVENTIVE DENTISTRY",
    "Applied Biostatistics",
    "Research Methodology"
]

def extract_text_from_pdf(pdf_path):
    """Extract all text from PDF with page numbers"""
    pages = []
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for i, page in enumerate(pdf_reader.pages):
            text = page.extract_text()
            pages.append({
                'page_num': i + 1,
                'text': text
            })
    return pages

def find_section_pages(pages, section_keywords):
    """Find page ranges for each section"""
    sections = {}
    all_text = "\n".join([p['text'] for p in pages])
    
    # Create a mapping of page numbers to content
    page_map = {}
    current_pos = 0
    for p in pages:
        page_map[current_pos] = p['page_num']
        current_pos += len(p['text']) + 1  # +1 for newline
    
    for section in section_keywords:
        # Search for section heading
        pattern = re.compile(rf"({re.escape(section)})", re.IGNORECASE)
        matches = list(pattern.finditer(all_text))
        
        if matches:
            for match in matches:
                pos = match.start()
                # Find which page this position falls on
                page_num = None
                for start_pos, pg in sorted(page_map.items(), reverse=True):
                    if pos >= start_pos:
                        page_num = pg
                        break
                
                if section not in sections:
                    sections[section] = []
                sections[section].append({
                    'page': page_num,
                    'position': pos,
                    'match': match.group(0)
                })
    
    return sections

# Extract all pages
print("Extracting PDF content...")
pages = extract_text_from_pdf(pdf_path)
print(f"Total pages: {len(pages)}")

# Find sections
print("\nSearching for target sections...")
section_info = find_section_pages(pages, target_sections)

for section, locations in section_info.items():
    print(f"\n{section}:")
    for loc in locations:
        print(f"  Found on page {loc['page']}: '{loc['match'][:50]}...'")

# Save full text for manual inspection
full_text = "\n\n".join([f"=== PAGE {p['page_num']} ===\n{p['text']}" for p in pages])
with open('extracted_preventive_dentistry_full.txt', 'w', encoding='utf-8') as f:
    f.write(full_text)

print("\n\nFull text saved to: extracted_preventive_dentistry_full.txt")
