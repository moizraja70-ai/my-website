
import re
import json

# Read the input file
try:
    with open(r'c:/Users/b/Downloads/dentedge/data/toothMorphologyNotes.ts', 'r', encoding='utf-8') as f:
        content = f.read()
except FileNotFoundError:
    print("Input file not found.")
    exit(1)

# Extract the HTML content string
# It's inside `content: String.raw` ... `
match = re.search(r'content:\s*String\.raw`([\s\S]*?)`,', content)
if not match:
    print("Could not find content string")
    exit(1)

html_content = match.group(1)

# Find the MCQ section
# Note: The HTML might have specific classes, so flexible matching is key.
mcq_start_match = re.search(r'MCQs WITH ANSWERS', html_content)
if not mcq_start_match:
    print("Could not find MCQ section")
    exit(1)

mcq_text = html_content[mcq_start_match.start():]

# Clean up HTML tags for easier regexing?
# Actually, keeping structure is safer for distinguishing Questions from Answers.
# But let's simplify:
# Questions look like: <p ...>Q1. ...</p>
# Options look like: <li ...>A) ...</li>
# Answers look like: <p ...>ANSWER: ...</p>

# Regex approach:
# We iterate through the text and state machine it? Or split?
# Let's try splitting by "Q\d+\." again but be more precise.

# First, let's normalize spaces
clean_text = ' '.join(mcq_text.split())

# Find all question blocks. A question block starts with a P tag containing Q\d+
# and ends before the next Q\d+ or end of string.
# However, inside a block we have UL/LI for options and P for Answer.

# Let's use a pattern that captures the whole Q block structure if possible,
# or just iterate.

# Findings:
# Q: <p class="c6"><span class="c13">Q1. Which tooth...</span></p>
# Opts: <ul ...><li ...><span ...>A) ...</span></li>...</ul>
# Ans: <p class="c6"><span class="c18 c13">ANSWER: C - ...</span></p>

# Let's try to parse entirely with regex finding all separate parts and assembling.
# It might be safer to parse linearly.

from html.parser import HTMLParser

class MCQParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.current_tag = ""
        self.current_data = ""
        self.mcqs = []
        self.current_mcq = None
        self.in_mcq_section = False
        self.buffer = ""
        self.capture = False
    
    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        self.capture = True
        
    def handle_endtag(self, tag):
        self.capture = False
        text = self.buffer.strip()
        self.buffer = ""
        
        if not text: return

        # Check for Section Header
        if "MCQs WITH ANSWERS" in text:
            self.in_mcq_section = True
            return

        if not self.in_mcq_section: return

        # Check for Question
        # Matches "Q1. Text" or "1. Text" format?
        # The text usually starts with "Q" followed by digits.
        q_match = re.match(r'^Q(\d+)\.\s*(.*)', text)
        if q_match:
            # Save previous MCQ if exists
            if self.current_mcq:
                self.mcqs.append(self.current_mcq)
            
            self.current_mcq = {
                "id": f"TM_{q_match.group(1).zfill(2)}",
                "question": q_match.group(2).strip(),
                "options": [],
                "correctAnswerIndex": -1,
                "explanation": ""
            }
            return

        # Check for Options
        # "A) Text"
        opt_match = re.match(r'^([A-D])\)\s*(.*)', text)
        if opt_match and self.current_mcq:
            # We assume options come in order A, B, C, D
            self.current_mcq["options"].append(opt_match.group(2).strip())
            return

        # Check for Answer
        # "ANSWER: C - Text"
        # "ANSWER: True - Text" (for T/F)
        ans_match = re.match(r'^ANSWER:\s*([A-D]|True|False)\s*[-–]\s*(.*)', text, re.IGNORECASE)
        if ans_match and self.current_mcq:
            ans_key = ans_match.group(1).upper()
            explanation = ans_match.group(2).strip()
            self.current_mcq["explanation"] = explanation
            
            if ans_key == "TRUE":
                 # Handle True/False questions?
                 # Usually options are A) True B) False?
                 # Or just statements?
                 # The text says "True/False - 8 Questions"
                 # Let's see if we captured options for T/F.
                 # If not, we might need to synthesize them or skip T/F if simpler.
                 # Let's skip T/F if options are missing for now or default.
                 pass
            elif ans_key == "FALSE":
                 pass
            else:
                idx = ord(ans_key) - ord('A')
                self.current_mcq["correctAnswerIndex"] = idx
            return

    def handle_data(self, data):
        if self.capture:
            self.buffer += data

parser = MCQParser()
parser.feed(html_content)

# Append last one
if parser.current_mcq:
    parser.mcqs.append(parser.current_mcq)

# Filter out incomplete or T/F questions if they don't fit the schema well
final_mcqs = []
for m in parser.mcqs:
    if len(m["options"]) >= 2 and m["correctAnswerIndex"] != -1:
        final_mcqs.append(m)

# Output
output_ts = """
import { MCQ } from "../types";

export const TOOTH_MORPHOLOGY_MCQS: MCQ[] = """ + json.dumps(final_mcqs, indent=2) + ";"

print(f"Extracted {len(final_mcqs)} MCQs")
with open(r'c:/Users/b/Downloads/dentedge/data/toothMorphologyMCQs.ts', 'w', encoding='utf-8') as f:
    f.write(output_ts)
