import PyPDF2
import re

pdf_path = r"C:\Users\b\.kimi\sessions\abc04135a4d2047f4ffb7df61f21fee1\509dfe12-00cc-4b7a-a1a2-4dfec2bb0c50\uploads\Textbook of Preventive and Community Dentistry  PDFDrive _819_d07daa.pdf"

def extract_pages(pdf_path, start_page, end_page):
    """Extract text from specific page range"""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for i in range(start_page - 1, min(end_page, len(pdf_reader.pages))):
            text += f"\n\n--- PAGE {i + 1} ---\n"
            text += pdf_reader.pages[i].extract_text()
    return text

# Section page mappings based on typical textbook structure
# SECTION B: EPIDEMIOLOGY - starts around page 65
# SECTION C: INFECTION CONTROL - starts around page 273  
# Chapter 12 Indices - starts around page 471
# SECTION E: PREVENTIVE DENTISTRY - starts around page 549
# Applied Biostatistics - starts around page 997

sections = {
    "SECTION_B_EPIDEMIOLOGY": (65, 272),
    "SECTION_C_INFECTION_CONTROL": (273, 350),
    "CHAPTER_12_INDICES": (471, 548),
    "SECTION_E_PREVENTIVE_DENTISTRY": (549, 750),
    "APPLIED_BIOSTATISTICS_RESEARCH": (997, 1100)
}

print("Extracting sections...\n")

for section_name, (start, end) in sections.items():
    print(f"Extracting {section_name} (pages {start}-{end})...")
    content = extract_pages(pdf_path, start, end)
    
    output_file = f"section_{section_name.lower()}.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  Saved to: {output_file} ({len(content)} characters)\n")

print("Extraction complete!")
