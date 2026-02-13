import os
import re
import json
from bs4 import BeautifulSoup

# Configuration
HTML_FILE = 'BDS_Community_Medicine_Notes_1_.html'
OUTPUT_TS_FILE = 'data/communityMedicineNotes.ts'

def get_callout_style(text):
    text_upper = text.strip().upper()
    if 'EXAM MAP' in text_upper or 'HIGH-YIELD' in text_upper or 'MCQ TRAP' in text_upper or 'TRAP:' in text_upper:
        return 'red'
    if 'CORE DEFINITIONS' in text_upper or 'KEY TERMINOLOGIES' in text_upper:
        return 'green'
    if 'VIVA QUESTIONS' in text_upper or 'SHORT NOTE' in text_upper or 'VIVA ONE-LINERS' in text_upper or 'COMMON SHORT NOTES' in text_upper:
        return 'yellow'
    if 'CONCEPT BUILD' in text_upper:
        return 'green'
    return None

def process_html():
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    content_markdown = []
    mcqs = []
    
    all_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'table'])
    
    start_index = 0
    found_toc_header = False
    
    # Locate Content Start (Skip TOC)
    for i, elem in enumerate(all_elements):
        text = elem.get_text().strip()
        text_upper = text.upper()
        
        if "TABLE OF CONTENTS" in text_upper:
            found_toc_header = True
            continue
            
        if "CHAPTER 7: EPIDEMIOLOGICAL METHODS" in text_upper:
            if re.search(r'\s+\d+$', text): # TOC entry
                print(f"Skipping TOC entry: {text}")
                continue
            
            if found_toc_header and not re.search(r'\d+$', text):
                 start_index = i
                 print(f"Found Content Start at index {i}: {text[:50]}...")
                 break
    
    if start_index == 0:
        last_idx = 0
        for i, elem in enumerate(all_elements):
            text = elem.get_text().strip().upper()
            if "CHAPTER 7: EPIDEMIOLOGICAL METHODS" in text:
                last_idx = i
        if last_idx > 0:
             start_index = last_idx

    elements_to_process = all_elements[start_index:]
    
    current_callout = None
    current_topic = "" 
    
    parsing_mcqs = False
    current_mcq = None
    
    for elem in elements_to_process:
        tag_name = elem.name
        text = elem.get_text().strip()
        text_upper = text.upper()

        # Check for start of MCQ section
        if "MCQ SET WITH ANSWERS" in text_upper:
            print("Found MCQ Section start. Stopping notes processing.")
            parsing_mcqs = True
            # Close any open callouts
            if current_callout:
                content_markdown.append('</div>\n')
                current_callout = None
            continue

        if parsing_mcqs:
            # Parse MCQs
            # Expected format:
            # Q1. Question...
            # A) ...
            # B) ...
            # Answer: X
            # Explanation: ...
            
            if not text: continue
            
            # Start of new Question
            q_match = re.match(r'^Q(\d+)\.\s*(.*)', text, re.IGNORECASE)
            if q_match:
                # Save previous MCQ if exists
                if current_mcq:
                    mcqs.append(current_mcq)
                
                q_num = q_match.group(1)
                q_text = q_match.group(2)
                current_mcq = {
                    "id": f"comm_med_{q_num}",
                    "question": q_text,
                    "options": [],
                    # temp storage for parsing
                    "_options_map": {}, 
                    "correctAnswerIndex": -1,
                    "explanation": ""
                }
                continue
            
            # Options
            opt_match = re.match(r'^([A-D])\)\s*(.*)', text, re.IGNORECASE)
            if opt_match and current_mcq:
                opt_letter = opt_match.group(1).upper()
                opt_text = opt_match.group(2)
                current_mcq["options"].append(opt_text)
                # We assume options come in order A, B, C, D. 
                # If they might be out of order, we need to map them.
                # But standard is order. 
                # Let's trust order for index 0,1,2,3.
                continue
            
            # Answer
            ans_match = re.match(r'^Answer:\s*([A-D])', text, re.IGNORECASE)
            if ans_match and current_mcq:
                ans_letter = ans_match.group(1).upper()
                idx_map = {'A': 0, 'B': 1, 'C': 2, 'D': 3}
                current_mcq["correctAnswerIndex"] = idx_map.get(ans_letter, -1)
                continue
            
            # Explanation
            exp_match = re.match(r'^Explanation:\s*(.*)', text, re.IGNORECASE)
            if exp_match and current_mcq:
                current_mcq["explanation"] = exp_match.group(1)
                continue
            
            # If line is just text and we are in explanation or question, append?
            # Usually strict format. If it's "Mixed Across All Chapters", ignore.
            if "MIXED ACROSS ALL CHAPTERS" in text_upper:
                continue
                
            # Handle multiline explanation or question?
            # Assuming single lines for now based on snippet.
            
        else:
            # Normal Content Processing
            
            # Track Topics
            if tag_name in ['h1', 'h2', 'h3'] and not get_callout_style(text):
                 clean_text = text.replace('#', '').strip()
                 if clean_text:
                     current_topic = clean_text
            
            style_type = get_callout_style(text)
            
            if style_type:
                if current_callout and current_callout != style_type:
                    content_markdown.append('</div>\n')
                    current_callout = None
                
                if not current_callout:
                    current_callout = style_type
                    if style_type == 'red':
                        content_markdown.append('\n<div style="background:#fce8e6;border-left:4px solid #d93025;border-radius:8px;padding:16px 20px;margin:16px 0;">\n\n')
                    elif style_type == 'green':
                        content_markdown.append('\n<div style="background:#e6f4ea;border-left:4px solid #1e8e3e;border-radius:8px;padding:16px 20px;margin:16px 0;">\n\n')
                    elif style_type == 'yellow':
                        content_markdown.append('\n<div style="background:#fef7e0;border-left:4px solid #f9ab00;border-radius:8px;padding:16px 20px;margin:16px 0;">\n\n')
            
            if tag_name in ['h1', 'h2'] and not style_type:
                 if current_callout:
                     content_markdown.append('</div>\n')
                     current_callout = None
            
            # Headers
            if tag_name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
                level = int(tag_name[1])
                final_text = text
                if style_type and current_topic:
                     text_upper = text.upper()
                     if "MCQ TRAP" in text_upper or "EXAM MAP" in text_upper:
                          if current_topic.upper() not in text_upper:
                               final_text = f"{text} - {current_topic}"
                
                html_tag = f"h{min(level + 1, 4)}"
                content_markdown.append(f"<{html_tag}>{final_text}</{html_tag}>\n\n")
                continue
                
            # Lists
            if tag_name == 'ul':
                for li in elem.find_all('li'):
                    item_text = process_inline_formatting(li)
                    content_markdown.append(f"- {item_text}\n")
                content_markdown.append("\n")
                continue
                
            if tag_name == 'ol':
                for i, li in enumerate(elem.find_all('li'), 1):
                    item_text = process_inline_formatting(li)
                    content_markdown.append(f"{i}. {item_text}\n")
                content_markdown.append("\n")
                continue

            # Tables
            if tag_name == 'table':
                rows = elem.find_all('tr')
                if rows:
                    content_markdown.append("\n")
                    first_row_cols = rows[0].find_all(['td', 'th'])
                    header_line = "| " + " | ".join([c.get_text().strip() for c in first_row_cols]) + " |"
                    separator_line = "| " + " | ".join(["---"] * len(first_row_cols)) + " |"
                    content_markdown.append(f"{header_line}\n{separator_line}\n")
                    
                    for row in rows[1:]:
                        cols = row.find_all(['td', 'th'])
                        line = "| " + " | ".join([c.get_text().strip() for c in cols]) + " |"
                        content_markdown.append(f"{line}\n")
                    content_markdown.append("\n")
                continue
                
            # Paragraphs
            if tag_name == 'p':
                if not text: continue
                md_text = process_inline_formatting(elem)
                
                if md_text.strip().startswith('**') and md_text.strip().endswith('**') and len(md_text) < 100:
                    clean_bold = md_text.strip()[2:-2]
                    content_markdown.append(f"<h4>{clean_bold}</h4>\n\n")
                else:
                    content_markdown.append(f"{md_text}\n\n")

    if current_callout:
        content_markdown.append('</div>\n')

    # Append last MCQ
    if current_mcq:
        mcqs.append(current_mcq)

    # Clean up MCQs (remove temp fields)
    for m in mcqs:
        if "_options_map" in m: del m["_options_map"]

    full_content = "".join(content_markdown)
    
    # Generate JSON string for MCQs
    mcq_json = json.dumps(mcqs, indent=2)
    # Remove quotes around keys to make it look like TS source if desired, or just keep as JSON
    # Better to write valid TS.
    # We can just inject the JSON string but remove quotes from keys? No, JSON is valid TS if type matches.
    # Just need interface MCQ import.
    
    ts_content = f"""import {{ MCQ }} from '../types';

export const COMMUNITY_MEDICINE_NOTES = {{
  summary: {{
    content: String.raw`{full_content.replace('`', '`')}
`,
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

export const COMMUNITY_MEDICINE_MCQS: MCQ[] = {mcq_json};
"""
    
    with open(OUTPUT_TS_FILE, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Successfully processed HTML to {OUTPUT_TS_FILE}")
    print(f"Extracted {len(mcqs)} MCQs.")

def process_inline_formatting(elem):
    out = ""
    for child in elem.contents:
        if isinstance(child, str):
             out += child
        elif child.name == 'br':
             out += "\n"
        elif child.name in ['b', 'strong']:
             out += f"**{child.get_text().strip()}**"
        elif child.name in ['i', 'em']:
             out += f"*{child.get_text().strip()}*"
        elif child.name == 'span':
             style = child.get('style', '').lower()
             child_text = child.get_text()
             if 'bold' in style or '700' in style:
                 out += f"**{child_text}**"
             elif 'italic' in style:
                 out += f"*{child_text}*"
             else:
                 out += child_text
        else:
            try:
                out += child.get_text()
            except: 
                pass
    return out.strip()

if __name__ == '__main__':
    process_html()
