"""
Fix formatting/structure issues in physiologyNotes.ts
- Bold markers: ** text ** -> **text**
- Table separators: | : --- | -> |:---|
- Italic markers: * text * -> *text*
NO content is changed or omitted -- only markdown structure is fixed.
"""
import re
import shutil

filepath = r"c:\Users\b\Downloads\dentedge\data\physiologyNotes.ts"
bakpath = filepath + ".bak"

# Restore from backup
shutil.copy(bakpath, filepath)
print("Restored from backup")

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

original_len = len(content)

# STEP 1: Fix bold markers with spaces on BOTH sides: ** text ** -> **text**
# Uses lookbehind to ensure opening ** is preceded by whitespace/pipe/paren
# Uses [^*\n]+? to prevent crossing lines or matching text with *
content = re.sub(r'(?<=[\s|(])\*\* ([^*\n]+?) \*\*', r'**\1**', content)

# STEP 2: Fix bold markers containing * inside (e.g. multiplication)
# and "space only at start" like ** Na +**
# Uses negative lookahead for ** to allow single * in inner text
content = re.sub(r'(?<=[\s|(])\*\* ((?:(?!\*\*)[^\n])+?)\s?\*\*', r'**\1**', content)

# STEP 3: Fix table separator spacing: | : --- -> |:---
content = re.sub(r'\| : (---+:?)', r'|:\1', content)

# STEP 4: Fix italic after list markers: *   * text * -> *   *text*
# CRITICAL: Use [ ] (spaces only) to prevent newline crossing
content = re.sub(r'(\*[ ]{1,5})\* ([^*\n]+?) \*', r'\1*\2*', content)

# STEP 5: Fix italic after dash markers: - * text * -> - *text*
content = re.sub(r'(-[ ]+)\* ([^*\n]+?) \*', r'\1*\2*', content)

# STEP 6: Fix inline italic: word * text * -> word *text*
# Only when preceded by non-whitespace non-asterisk char
content = re.sub(r'(?<=[^\s*]) \* ([^*\n]+?) \*(?=[^*])', r' *\1*', content)

# Verification
new_len = len(content)
print(f"Chars removed: {original_len - new_len}")

remaining_bold = len(re.findall(r'(?<=[\s|(])\*\* [^*\n]+? \*\*', content))
print(f"Remaining spaced bold (strict): {remaining_bold}")

list_bad = len(re.findall(r'^\*[A-Z]', content, re.MULTILINE))
print(f"List markers WITHOUT space (should be 0): {list_bad}")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
