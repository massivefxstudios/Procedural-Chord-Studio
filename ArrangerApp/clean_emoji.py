import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

p = r'd:\Music_MassiveProduct\Chord_Program\ArrangerApp\index.html'
with open(p, 'r', encoding='utf-8', errors='replace') as f:
    text = f.read()

fixes = [
    ('<h3> Persona Kütüphanesi</h3>', '<h3>🎭 Persona Kütüphanesi</h3>'),
    ('title="Kapat">•</button>', 'title="Kapat">❌</button>'),
    ('â€”', '—'),
    ('<span class="detail-label"> Vokal Tarzı</span>', '<span class="detail-label">🎤 Vokal Tarzı</span>'),
    ('<span class="detail-label"> Etiketler</span>', '<span class="detail-label">🏷️ Etiketler</span>'),
    ('âœ  Persona Düzenle', '✏️ Persona Düzenle'),
    (' Persona Düzenle</h4>', '✏️ Persona Düzenle</h4>'),
    ('¶ Aranje Oluştur', '🎸 Aranje Oluştur'),
    ('¶ Synth Pad', '🎹 Synth Pad'),
    ('¹ Keys', '🎹 Keys'),
    ('¸ Pluck Synth', '🎸 Pluck Synth'),
    ('â ¹ Durdur', '⏹️ Durdur'),
    ('\u00b9 Durdur', '⏹️ Durdur'),
    ('«', '🚫'),
    (' Personalar', '👥 Personalar'),
    ('\u00B6', '🎹'), # replace leftover paragraph symbols
    ('\u00B8', '⚡'), # replace other weird chars
    ('\u00B9', '🎹'),
    ('\u0152\u0152', '🌌'),
    ('ŒŒ', '🌌'),
    ('\u00b4', '🎺'),
    ('\u00b5', '🎻'),
    ('\u00b6', '🎼'),
    ('\u00bb', '🎽'),
    ('\u00a7', '🎧'),
    ('\u00a4', '🎤'),
    ('\u00a2', '✅'),
    ('\u00ac', '📋'),
    ('\xa8', '📈'),
    ('\xa1', '💡'),
    ('\x80', '🚀'),
    ('\u0153\u00a1', '⚡'),
    ('\u0152', '🌍'),
    ('\u00ac', '🎬'),
    ('\u203a', '🛑'),
    ('\u00a8', '📝'),
    ('\u0160', '📊'),
    ('\u2122', '🎙'),
    ('\u0161', '🎚'),
    ('\u203a', '🎛'),
    ('\u2020', '🙊'),
    ('\u00a5', '🥁'),
    ('\u00a2', '📢'),
    ('\u00a3', '📣'),
    ('\u00b1', '📱'),
    ('\u201d', '🔔'),
]

count = 0
for bad, good in fixes:
    if bad in text:
        n = text.count(bad)
        text = text.replace(bad, good)
        print(f"Fixed {n}x: {bad!r} -> {good!r}")
        count += n

with open(p, 'w', encoding='utf-8') as f:
    f.write(text)

print(f'\nTotal {count} fixes applied.')
print('Saved index.html')
