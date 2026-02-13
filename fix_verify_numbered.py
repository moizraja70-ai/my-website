"""Final verification: find inconsistent numbered list siblings."""
import re

filepath = r"c:\Users\b\Downloads\dentedge\data\physiologyNotes.ts"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

issues = 0
for i in range(len(lines) - 1):
    line = lines[i].rstrip()
    next_line = lines[i + 1].rstrip()
    
    # Check: numbered item at 0 followed by numbered item at 4
    m1 = re.match(r'^(\d+)\.\s', line)
    m2 = re.match(r'^    (\d+)\.\s', next_line)
    if m1 and m2:
        n1, n2 = int(m1.group(1)), int(m2.group(1))
        if n2 == n1 + 1:  # consecutive
            issues += 1
            print(f"L{i+1}-{i+2}: MISMATCH {n1}. at 0 then {n2}. at 4")
    
    # Check: numbered item at 4 followed by numbered item at 0
    m1 = re.match(r'^    (\d+)\.\s', line)
    m2 = re.match(r'^(\d+)\.\s', next_line)
    if m1 and m2:
        n1, n2 = int(m1.group(1)), int(m2.group(1))
        if n2 == n1 + 1:  # consecutive
            issues += 1
            print(f"L{i+1}-{i+2}: MISMATCH {n1}. at 4 then {n2}. at 0")

print(f"\nTotal mismatches: {issues}")
