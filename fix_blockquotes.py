"""Fix blockquotes at 4-space indent -> 0 indent in physiologyNotes.ts"""
import re

filepath = r"c:\Users\b\Downloads\dentedge\data\physiologyNotes.ts"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

changes = 0
for i, line in enumerate(lines):
    # Match lines starting with 4 spaces then > (blockquote)
    if re.match(r'^    > ', line):
        lines[i] = line[4:]  # strip 4 spaces
        changes += 1
        print(f"L{i+1}: blockquote stripped")

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\nTotal blockquote fixes: {changes}")
