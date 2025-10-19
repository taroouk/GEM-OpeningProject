
const map = {
  a: '𓄿', b: '𓃀', c: '𓍿', d: '𓂧', e: '𓇋',
  f: '𓆑', g: '𓎼', h: '𓉔', i: '𓇋', j: '𓆓',
  k: '𓎡', l: '𓃭', m: '𓅓', n: '𓈖', o: '𓍯',
  p: '𓊪', q: '𓈎', r: '𓂋', s: '𓋴', t: '𓏏',
  u: '𓅱', v: '𓆑', w: '𓅱', x: '𓐍', y: '𓇌', z: '𓊃', ' ': ' '
};

const input = document.getElementById('nameInput');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const glyphContainer = document.getElementById('glyphContainer');
const plainText = document.getElementById('plainText');
const copyBtn = document.getElementById('copyBtn');

function toHieroglyphs(text) {
  const letters = text.trim().toLowerCase().split('');
  return letters.map(ch => map[ch] || '?');
}

function render(text) {
  const glyphs = toHieroglyphs(text);
  glyphContainer.innerHTML = '';
  if (!text.trim()) {
    plainText.textContent = '—';
    return;
  }
  glyphs.forEach(g => {
    const span = document.createElement('div');
    span.className = 'glyph';
    if (g === ' ') {
      span.style.background = 'transparent';
      span.style.boxShadow = 'none';
      span.style.border = 'none';
    } else {
      span.textContent = g;
    }
    glyphContainer.appendChild(span);
  });
  plainText.textContent = glyphs.join(' ');
}

convertBtn.addEventListener('click', () => render(input.value));
input.addEventListener('keydown', e => { if (e.key === 'Enter') render(input.value); });
clearBtn.addEventListener('click', () => { input.value = ''; render(''); });

copyBtn.addEventListener('click', () => {
  const text = plainText.textContent;
  if (!text || text === '—') return;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy Hieroglyphs', 1200);
  });
});

input.value = 'Nouran';
render(input.value);
