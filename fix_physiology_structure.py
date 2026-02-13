"""
Comprehensive structure fix for physiologyNotes.ts Topics 2-12.
Fixes indentation issues that cause react-markdown rendering problems.
Topic 1 is already well-formatted and is skipped.
"""
import re

filepath = r"c:\Users\b\Downloads\dentedge\data\physiologyNotes.ts"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')

# --- Step 1: Find template boundaries ---
templates = []
template_start = None
template_count = 0
for i, line in enumerate(lines):
    if 'content: String.raw`' in line:
        template_count += 1
        template_start = i
    elif template_start is not None and i > template_start:
        s = line.strip()
        if s in ('`', '`,') or s == '`\r':
            templates.append((template_start, i, template_count))
            template_start = None

print(f"Found {len(templates)} templates")
for s, e, n in templates:
    print(f"  Topic {n}: lines {s+1}-{e+1}")

# --- Step 2: Process Topics 2-12 ---
changes = 0
change_details = {
    'bold_heading': 0,
    'section_heading': 0,
    'separator': 0,
    'table': 0,
    'html_div': 0,
    'over_indented_para': 0,
    'mcq_option': 0,
    'answer_line': 0,
    'top_level_bullet': 0,
    'numbered_sub': 0,
    'saq_answer': 0,
}

for tpl_start, tpl_end, tpl_num in templates:
    if tpl_num < 2:
        continue  # Skip Topic 1

    for i in range(tpl_start + 1, tpl_end):
        orig = lines[i]
        stripped = orig.lstrip()
        leading = len(orig) - len(stripped)

        if leading < 4 or not stripped:
            continue

        new_line = None

        # Rule 1: Bold headings like **N) or **N. — always at indent 0
        if re.match(r'\*\*\d+[\.\)]\s', stripped) or re.match(r'\*\*\d+[\.\)]', stripped):
            new_line = stripped
            change_details['bold_heading'] += 1

        # Rule 2: Markdown headings (## or ###)
        elif re.match(r'#+\s', stripped):
            new_line = stripped
            change_details['section_heading'] += 1

        # Rule 3: Separators (---)
        elif stripped.startswith('---'):
            new_line = stripped
            change_details['separator'] += 1

        # Rule 4: Table rows
        elif stripped.startswith('|'):
            new_line = stripped
            change_details['table'] += 1

        # Rule 5: HTML div tags
        elif stripped.startswith('<div') or stripped.startswith('</div'):
            new_line = stripped
            change_details['html_div'] += 1

        # Rule 6: MCQ options (* A), * B), etc.) — should all be at indent 0
        elif re.match(r'\*\s+[A-Da-d]\)', stripped) or re.match(r'\*\s+[A-Da-d]\.\s', stripped):
            new_line = stripped
            change_details['mcq_option'] += 1

        # Rule 7: Answer/Explanation lines
        elif stripped.startswith('*') and ('Answer:' in stripped or 'Explanation:' in stripped):
            new_line = stripped
            change_details['answer_line'] += 1

        # Rule 8: Over-indented plain text (8+ spaces, not list/table/html/heading)
        elif leading >= 8 and not stripped.startswith('*') and not stripped.startswith('|') and not stripped.startswith('<') and not stripped.startswith('#'):
            if re.match(r'\d+\.\s+\*\*', stripped):
                # Numbered sub-item under a parent (e.g., "1. **Battery**: ...")
                # Keep at 4 spaces indent (one level)
                new_line = '    ' + stripped
                change_details['numbered_sub'] += 1
            else:
                new_line = stripped
                change_details['over_indented_para'] += 1

        # Rule 9: List items at 4 spaces that should be top-level
        elif leading == 4 and stripped.startswith('*'):
            # Check context: find previous non-blank line
            prev_stripped = ''
            prev_leading = 0
            for j in range(i - 1, max(tpl_start, i - 10), -1):
                ps = lines[j].strip()
                if ps:
                    prev_stripped = ps
                    prev_leading = len(lines[j]) - len(lines[j].lstrip())
                    break

            should_strip = False

            # After a heading (##, ###), the first item must be top-level
            if prev_stripped.startswith('#'):
                should_strip = True
            # After a separator (---), items are top-level
            elif prev_stripped == '---':
                should_strip = True
            # After a </div>, items are top-level
            elif prev_stripped.startswith('</div'):
                should_strip = True
            # If previous item is at indent 0 and is a list item, this should match
            elif prev_leading == 0 and prev_stripped.startswith('*'):
                # Only strip if the previous item does NOT end with colon
                # (colon means "I have sub-items")
                if not prev_stripped.rstrip().endswith(':') and not prev_stripped.rstrip().endswith(':**'):
                    should_strip = True
            # If previous item is at indent 0 and is a bold heading
            elif prev_leading == 0 and prev_stripped.startswith('**'):
                should_strip = True

            if should_strip:
                new_line = stripped
                change_details['top_level_bullet'] += 1

        if new_line is not None and new_line != orig:
            lines[i] = new_line
            changes += 1

# --- Step 3: Fix MCQ answer option nesting pattern ---
# Pattern: answers like "    * B)\n        * C)\n            * D)"
# Already handled by Rule 6 above

# --- Step 4: Ensure blank lines around bold headings for readability ---
# After stripping indent from **N) Heading**, ensure blank line above if preceded by content
new_lines = []
for i, line in enumerate(lines):
    # Check if this is a bold heading at indent 0 that was just fixed
    stripped = line.lstrip()
    leading = len(line) - len(stripped)
    if leading == 0 and re.match(r'\*\*\d+[\.\)]\s', stripped):
        # Check if previous line is non-blank content (not a heading or blank)
        if i > 0 and new_lines:
            prev = new_lines[-1].strip()
            if prev and not prev.startswith('#') and not prev.startswith('---') and prev != '</div>' and not prev.startswith('</div'):
                # Insert blank line before this heading
                if new_lines[-1].strip() != '':
                    new_lines.append('')
                    changes += 1
    new_lines.append(line)

lines = new_lines

# --- Step 5: Write back ---
new_content = '\n'.join(lines)
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\nTotal changes: {changes}")
for k, v in change_details.items():
    if v > 0:
        print(f"  {k}: {v}")

# --- Step 6: Verify ---
with open(filepath, 'r', encoding='utf-8') as f:
    verify_lines = f.read().split('\n')

print(f"\nNew total lines: {len(verify_lines)}")

# Count remaining issues
remaining_bold = 0
remaining_table = 0
remaining_para = 0
remaining_mcq = 0
for tpl_start, tpl_end, tpl_num in templates:
    if tpl_num < 2:
        continue
    # Adjust for any inserted blank lines (approximate)
    for i in range(min(tpl_start, len(verify_lines)-1), min(tpl_end + 200, len(verify_lines))):
        line = verify_lines[i]
        stripped = line.lstrip()
        leading = len(line) - len(stripped)
        if leading >= 4:
            if re.match(r'\*\*\d+[\.\)]\s', stripped):
                remaining_bold += 1
            elif stripped.startswith('|'):
                remaining_table += 1
            elif leading >= 8 and not stripped.startswith('*') and not stripped.startswith('|') and not stripped.startswith('<') and not stripped.startswith('#') and stripped:
                remaining_para += 1
            elif re.match(r'\*\s+[A-D]\)', stripped) and leading >= 4:
                remaining_mcq += 1

print(f"\nRemaining issues:")
print(f"  Indented bold headings: {remaining_bold}")
print(f"  Indented tables: {remaining_table}")
print(f"  Over-indented paragraphs: {remaining_para}")
print(f"  Indented MCQ options: {remaining_mcq}")
