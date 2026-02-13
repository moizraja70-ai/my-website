"""
Fix pattern: first numbered item at 0 indent while siblings at 4 indent.

Pattern:
  *   **Something**:
  1. First item          (at 0 indent - WRONG)
      2. Second item     (at 4 indent)

Fix: indent the `1. ` / `N. ` line to 4 spaces.
"""
import re

filepath = r"c:\Users\b\Downloads\dentedge\data\physiologyNotes.ts"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

changes = 0
i = 0
while i < len(lines) - 2:
    line = lines[i]
    next_line = lines[i + 1]
    next_next = lines[i + 2]
    
    curr_stripped = line.rstrip()
    
    # Current line should be a content line ending with :
    is_content_parent = (
        curr_stripped.endswith(':') or 
        curr_stripped.endswith(':**') or
        curr_stripped.endswith(':***')
    ) and len(curr_stripped) > 5
    
    # Next line: numbered item at 0 indent (e.g., "1. " or "1.  ")
    next_is_num_at_0 = re.match(r'^\d+\.\s', next_line) is not None
    
    # Line after: numbered or dash at 4 indent, or any continuation at 4
    after_at_4 = re.match(r'^    (\d+\.|[-*])', next_next) is not None
    
    if is_content_parent and next_is_num_at_0 and after_at_4:
        lines[i + 1] = '    ' + next_line
        changes += 1
        print(f"L{i+2}: '    {next_line.rstrip()}'")
    
    i += 1

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\nTotal changes: {changes}")
