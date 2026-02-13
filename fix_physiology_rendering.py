"""
Fix rendering issues in physiologyNotes.ts by ensuring proper blank lines
around HTML <div> blocks so react-markdown parses them correctly.
"""
import re

filepath = r"c:\Users\b\Downloads\dentedge\data\physiologyNotes.ts"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Step 1: Analyze current issues
print("=== ANALYSIS ===")
div_issues = []
for i, line in enumerate(lines):
    stripped = line.strip()
    if stripped.startswith('<div') or stripped.startswith('</div'):
        prev_line = lines[i-1].strip() if i > 0 else ''
        next_line = lines[i+1].strip() if i < len(lines)-1 else ''
        has_blank_before = prev_line == ''
        has_blank_after = next_line == ''
        if not has_blank_before or not has_blank_after:
            div_issues.append((i+1, stripped[:60], has_blank_before, has_blank_after))

print(f"Div tags missing blank line neighbors: {len(div_issues)}")
for ln, txt, bb, ba in div_issues[:30]:
    issues = []
    if not bb: issues.append("NO blank before")
    if not ba: issues.append("NO blank after")
    print(f"  L{ln}: {txt}  [{', '.join(issues)}]")
if len(div_issues) > 30:
    print(f"  ... and {len(div_issues)-30} more")

# Step 2: Fix by inserting blank lines around <div> and </div> tags
# Process from bottom to top so line numbers don't shift
insertions = []
for i, line in enumerate(lines):
    stripped = line.strip()
    if stripped.startswith('<div') or stripped.startswith('</div'):
        prev_line = lines[i-1].strip() if i > 0 else ''
        next_line = lines[i+1].strip() if i < len(lines)-1 else ''
        # Need blank line AFTER if next line is non-empty
        if next_line != '' and i < len(lines)-1:
            insertions.append(('after', i))
        # Need blank line BEFORE if prev line is non-empty
        if prev_line != '' and i > 0:
            insertions.append(('before', i))

# Sort insertions from bottom to top to maintain correct indices
# For 'after' insertions, insert at i+1; for 'before', insert at i
insert_ops = []
for kind, idx in insertions:
    if kind == 'after':
        insert_ops.append(idx + 1)
    else:
        insert_ops.append(idx)

# Remove duplicates and sort descending
insert_ops = sorted(set(insert_ops), reverse=True)

print(f"\nTotal blank lines to insert: {len(insert_ops)}")

for pos in insert_ops:
    lines.insert(pos, '\n')

# Step 3: Write back
with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"Done! Inserted {len(insert_ops)} blank lines.")

# Step 4: Verify
with open(filepath, 'r', encoding='utf-8') as f:
    lines2 = f.readlines()

remaining = 0
for i, line in enumerate(lines2):
    stripped = line.strip()
    if stripped.startswith('<div') or stripped.startswith('</div'):
        prev_line = lines2[i-1].strip() if i > 0 else ''
        next_line = lines2[i+1].strip() if i < len(lines2)-1 else ''
        if prev_line != '' or next_line != '':
            remaining += 1

print(f"Remaining issues after fix: {remaining}")
print(f"Total lines: {len(lines2)} (was {len(lines2) - len(insert_ops)})")
