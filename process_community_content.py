import re
import json

def parse_content():
    try:
        with open('word_doc_content.txt', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print("Error: word_doc_content.txt not found.")
        return

    # 1. Split into Notes and MCQs
    split_marker = "MCQ SET WITH ANSWERS"
    head, sep, tail = content.rpartition(split_marker)
    notes_raw = head if sep else content
    lines = notes_raw.split('\n')
    
    # 2. Strip TOC and Preamble
    # Locate the start of Chapter 7 AFTER the Table of Contents
    start_index = 0
    found_start = False
    seen_toc = False
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        
        # Check for TOC header first
        if "TABLE OF CONTENTS" in stripped.upper():
            seen_toc = True
            continue

        # Look for Chapter 7 header, ignoring the TOC entry which usually ends with a page number
        if "CHAPTER 7: EPIDEMIOLOGICAL METHODS" in stripped.upper():
            # Only consider it if we've seen TOC (avoids preamble)
            if not seen_toc:
                 continue

            # Check if it ends with a digit (likely TOC entry)
            # Use regex to check for digit at end of line, possibly preceded by whitespace/dots
            if re.search(r'[\d\t]+$', stripped):
                continue

            # Found the real header
            start_index = i
            found_start = True
            break
            
    if found_start:
        print(f"Found content start at line {start_index} (after TOC)")
        lines = lines[start_index:]
    else:
        print("Warning: Could not detect content start. Notes might include TOC.")
    
    # 3. Process Lines
    formatted_lines = []
    in_table = False
    table_lines = []
    current_div = None  # None, 'red', 'green', 'yellow'

    def close_div_if_open():
        nonlocal current_div
        if current_div:
            formatted_lines.append("\n\n</div>\n")
            current_div = None

    for line in lines:
        stripped_line = line.strip()
        
        # Empty lines
        if not stripped_line:
            if in_table:
                formatted_lines.append("\n" + "\n".join(table_lines) + "\n")
                in_table = False
                table_lines = []
            continue
            
        # Check for Section End triggers (Headers)
        is_header = stripped_line.upper().startswith('CHAPTER') or \
                    stripped_line.upper().startswith('SECTION') or \
                    re.match(r'^\d+[\).]\s+[A-Z\s\(\)]+$', stripped_line)

        if is_header and current_div:
            close_div_if_open()

        # Start Special Divs
        new_div_type = None
        div_style = ""
        
        # Red Box triggers
        if "EXAM MAP" in stripped_line.upper() or "HIGH-YIELD" in stripped_line.upper() or "MCQ TRAPS" in stripped_line.upper():
            new_div_type = 'red'
            div_style = 'background:#fce8e6;border-left:4px solid #d93025;border-radius:8px;padding:16px 20px;margin:16px 0;'
            
        # Green Box triggers
        elif "CORE DEFINITIONS" in stripped_line.upper() or "KEY TERMINOLOGIES" in stripped_line.upper() or "CONCEPT BUILD" in stripped_line.upper():
            new_div_type = 'green'
            div_style = 'background:#e6f4ea;border-left:4px solid #1e8e3e;border-radius:8px;padding:16px 20px;margin:16px 0;'

        # Yellow Box triggers
        elif "VIVA" in stripped_line.upper() or "TRAP" in stripped_line.upper() or "QUICK REVISION" in stripped_line.upper() or "SHORT NOTE" in stripped_line.upper():
            new_div_type = 'yellow'
            div_style = 'background:#fef7e0;border-left:4px solid #f9ab00;border-radius:8px;padding:16px 20px;margin:16px 0;'

        if new_div_type:
            close_div_if_open() # Close previous if exists
            current_div = new_div_type
            formatted_lines.append(f'\n<div style="{div_style}">\n\n**{stripped_line}**\n')
            continue

        # Normal Processing
        # Tables
        if '|' in stripped_line and len(stripped_line.split('|')) >= 2:
            if not in_table:
                in_table = True
                table_lines.append(stripped_line)
            else:
                table_lines.append(stripped_line)
            continue
        elif in_table:
             formatted_lines.append("\n" + "\n".join(table_lines) + "\n")
             in_table = False
             table_lines = []

        # Headers
        if stripped_line.upper().startswith('CHAPTER') or stripped_line.upper().startswith('SECTION'):
            formatted_lines.append(f"\n## {stripped_line}\n")
            continue
            
        if re.match(r'^\d+[\).]\s+[A-Z\s\(\)]+$', stripped_line):
             formatted_lines.append(f"\n### {stripped_line}\n")
             continue

        # Lists/Bold
        if stripped_line.startswith('-'):
            formatted_lines.append(f"\n{stripped_line}")
            continue
            
        if ':' in stripped_line:
            parts = stripped_line.split(':', 1)
            term = parts[0].strip()
            val = parts[1].strip()
            if len(term) < 60 and not term.startswith('*') and not term.startswith('-'):
                 formatted_lines.append(f"\n- **{term}**: {val}")
                 continue

        formatted_lines.append(f"\n{stripped_line}")

    # Closing
    if in_table:
        formatted_lines.append("\n" + "\n".join(table_lines) + "\n")
    close_div_if_open()

    notes_content = "".join(formatted_lines)
    notes_content_json = json.dumps(notes_content)
    
    notes_ts = f"""
export const COMMUNITY_MEDICINE_NOTES = {{
  summary: {{
    content: {notes_content_json},
    keyPoints: [
      "Epidemiology: Distribution + Determinants",
      "Triad: Agent, Host, Environment",
      "Incidence vs Prevalence",
      "Prevention Levels: Primordial to Tertiary",
      "Caries Epidemiology & Prevention",
      "Oral Cancer Risk Factors",
      "Periodontal Disease Epidemiology",
      "Fluoride: Mechanism & Toxicity",
      "Infection Control: Chain of Infection & Precautions",
      "Biostatistics: Mean, Median, Mode, SD, Tests of Significance"
    ]
  }}
}};
"""
    try:
        with open('data/communityMedicineNotes.ts', 'w', encoding='utf-8') as f:
            f.write(notes_ts)
        print("Success: Re-created notes with Callout Boxes")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    parse_content()
