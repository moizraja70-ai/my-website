"""Final verification: find remaining first-dash inconsistencies."""
import re

filepath = r"c:\Users\b\Downloads\dentedge\data\physiologyNotes.ts"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

issues = 0
for i in range(len(lines) - 2):
    curr = lines[i].rstrip()
    next_line = lines[i + 1]
    next_next = lines[i + 2]
    
    # Parent is a bullet/item ending with :
    is_parent = (curr.endswith(':') or curr.endswith(':**')) and (
        curr.startswith('*') or curr.startswith('    *') or curr.startswith('        *') or
        curr.startswith('-') or curr.startswith('    -')
    )
    
    # Next: dash at 0
    next_at_0 = re.match(r'^- ', next_line) is not None
    # After: dash at 4
    after_at_4 = re.match(r'^    - ', next_next) is not None
    
    if is_parent and next_at_0 and after_at_4:
        issues += 1
        print(f"L{i+2}: '{next_line.rstrip()[:80]}'")

print(f"\nRemaining first-dash issues: {issues}")
