import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

p = r'd:\Music_MassiveProduct\Chord_Program\ArrangerApp\index.html'

with open(p, 'rb') as f:
    raw = f.read()

# Remove orphan emoji remnant bytes: C3 A2 C5 93 (10 occurrences)
n = raw.count(b'\xc3\xa2\xc5\x93')
raw = raw.replace(b'\xc3\xa2\xc5\x93', b'')
print(f'Removed C3A2C593: {n}')

# Decode with error replacement, then strip replacement chars
text = raw.decode('utf-8', errors='replace')
repl_count = text.count('\ufffd')
print(f'Invalid UTF-8 chars before: {repl_count}')

text_clean = text.replace('\ufffd', '')
raw_clean = text_clean.encode('utf-8')

with open(p, 'wb') as f:
    f.write(raw_clean)
print('Saved clean UTF-8 file!')

# Verification
with open(p, encoding='utf-8') as f:
    final = f.read()

tr = len(re.findall(r'[\u015e\u015f\u011e\u011f\u0131\u0130\u00fc\u00dc\u00f6\u00d6\u00e7\u00c7]', final))
repl_final = final.count('\ufffd')
print(f'Turkish chars: {tr}, bad chars remaining: {repl_final}')

lines = final.split('\n')
for idx in [15, 180, 333, 338, 451]:
    if idx < len(lines):
        print(f'Line {idx+1}: {lines[idx].strip()[:85]}')
