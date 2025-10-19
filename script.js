/* ======================================================
   1) Intro Transition (Show content after intro screen)
   ====================================================== */
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro");
    const content = document.querySelector(".content");
    if (intro) intro.classList.add("hide-intro");
    if (content) content.classList.add("show-content");
    setTimeout(runInitialReveals, 350);
  }, 3000);
});

/* ======================================================
   2) Initial Reveals Animation
   ====================================================== */
function runInitialReveals() {
  const fadeUps = document.querySelectorAll(".fade-up");
  const scheduleItems = document.querySelectorAll(".schedule-item");
  const imageCards = document.querySelectorAll(".image-card");

  fadeUps.forEach((el, i) =>
    setTimeout(() => el.classList.add("visible", "show"), 120 * i)
  );
  scheduleItems.forEach((el, i) =>
    setTimeout(() => el.classList.add("show"), 120 * i + 200)
  );
  imageCards.forEach((el, i) =>
    setTimeout(() => el.classList.add("visible"), 140 * i + 200)
  );
}

/* ======================================================
   3) Scroll Reveal (IntersectionObserver)
   ====================================================== */
(() => {
  const targets = document.querySelectorAll(".fade-up, .schedule-item, .image-card");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible", "show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach(el => observer.observe(el));
  } else {
    const onScrollFallback = () => {
      targets.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
          el.classList.add("visible", "show");
        }
      });
    };
    window.addEventListener("scroll", onScrollFallback);
    window.addEventListener("load", onScrollFallback);
  }
})();

/* ======================================================
   4) Countdown Timer → Target: 1 November 2025
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const countdownDate = new Date("2025-11-01T00:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      document.getElementById("countdown").innerHTML = "<p>Event Started!</p>";
      clearInterval(interval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
});

/* ======================================================
   5) Navbar Background on Scroll
   ====================================================== */
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  if (window.scrollY > 50) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});

/* ======================================================
   6) Hieroglyph Name Converter
   ====================================================== */
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
  return text.trim().toLowerCase().split('').map(ch => map[ch] || '?');
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
    if (g !== ' ') span.textContent = g;
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
    setTimeout(() => (copyBtn.textContent = 'Copy Hieroglyphs'), 1200);
  });
});

// Default preview
input.value = " ";
render(input.value);
/* ======================================================
    Scroll
   ====================================================== */
 const carousel = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.card');

let scrollAmount = 1.5; 

function updateActiveCard() {
  let closestCard = null;
  let minDistance = Infinity;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const distance = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
    if (distance < minDistance) {
      minDistance = distance;
      closestCard = card;
    }
  });

  cards.forEach(card => card.classList.remove('active'));
  if (closestCard) closestCard.classList.add('active');
}


function autoScroll() {
  carousel.scrollLeft += scrollAmount;
  updateActiveCard();
}


setInterval(autoScroll, 16);

// Fade In animation on scroll
const section = document.querySelector('.fade-in-section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      section.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

observer.observe(section);


carousel.addEventListener('scroll', () => {
  requestAnimationFrame(updateActiveCard);
});

window.addEventListener('load', updateActiveCard);

