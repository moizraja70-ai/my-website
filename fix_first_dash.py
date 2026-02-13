"""
Fix pattern: first sub-item dash at 0 indent while siblings at 4 indent.

Pattern:
  *   **Something**:        (or any bullet/item ending with :)
  - First sub-item          (at 0 indent - WRONG)
      - Second sub-item     (at 4 indent)

Fix: indent the first `- ` line to 4 spaces to match siblings.
Only applies within content: String.raw` blocks (not TS structure).
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
    
    # Check pattern:
    # Current line: a bullet/item ending with `:` (possibly with trailing whitespace/newline)
    # Next line: starts with `- ` at column 0 (no leading whitespace)
    # Line after: starts with `    - ` at column 4
    
    curr_stripped = line.rstrip()
    
    # Current line should be a content line (bullet or heading) ending with : or :**
    is_content_parent = (
        curr_stripped.endswith(':') or 
        curr_stripped.endswith(':**')
    ) and (
        curr_stripped.startswith('*') or 
        curr_stripped.startswith('    *') or
        curr_stripped.startswith('        *') or
        curr_stripped.startswith('-') or
        curr_stripped.startswith('    -')
    )
    
    # Next line starts with `- ` at 0 indent
    next_is_dash_at_0 = re.match(r'^- ', next_line) is not None
    
    # Line after starts with `    - ` at 4 indent
    after_is_dash_at_4 = re.match(r'^    - ', next_next) is not None
    
    if is_content_parent and next_is_dash_at_0 and after_is_dash_at_4:
        lines[i + 1] = '    ' + next_line
        changes += 1
        print(f"L{i+2}: '    {next_line.rstrip()}'")
    
    i += 1

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\nTotal changes: {changes}")
