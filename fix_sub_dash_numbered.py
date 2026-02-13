"""
Fix pattern: sub-dash at 0 indent under a numbered item at 0 indent,
where next dash sibling is at 4 indent.

Pattern:
  1. **Something**:
  - *Action*: ...         (at 0 indent - WRONG)
      - *Result*: ...     (at 4 indent)

Fix: indent the `- ` line to 4 spaces.
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
    
    # Current line: a numbered item (at any indent) ending with : or )**
    is_numbered_parent = re.match(r'^\s*\d+\.\s', line) is not None and (
        curr_stripped.endswith(':') or 
        curr_stripped.endswith(')**') or
        curr_stripped.endswith(').')
    )
    
    # Next line: dash at 0 indent
    next_is_dash_at_0 = re.match(r'^- ', next_line) is not None
    
    # Line after: dash at 4 indent
    after_is_dash_at_4 = re.match(r'^    - ', next_next) is not None
    
    if is_numbered_parent and next_is_dash_at_0 and after_is_dash_at_4:
        lines[i + 1] = '    ' + next_line
        changes += 1
        print(f"L{i+2}: '    {next_line.rstrip()}'")
    
    i += 1

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\nTotal changes: {changes}")
