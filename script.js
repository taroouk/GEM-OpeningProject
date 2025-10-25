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

// Pyramid 3D Logo
// إعداد المشهد
const container = document.getElementById('three-pyramid');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.set(0, 0, 3);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// إضاءة المشهد
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// إنشاء الهرم
const geometry = new THREE.TetrahedronGeometry(1, 0);
const material = new THREE.MeshStandardMaterial({
  color: 0xd4af37, // ذهبي
  metalness: 0.3,
  roughness: 0.5,
  Highlight: 1,
  side: THREE.DoubleSide
});
const pyramid = new THREE.Mesh(geometry, material);
pyramid.rotation.x = -0.4;
scene.add(pyramid);

// إضاءة خفيفة خلفية
const rimLight = new THREE.PointLight(0xffffff, 0.3, 10);
rimLight.position.set(-2, 2, 3);
scene.add(rimLight);

// حركة تفاعلية
let mouseX = 0, mouseY = 0;
container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  mouseX = (e.clientX - rect.left - rect.width/2) / rect.width;
  mouseY = (e.clientY - rect.top - rect.height/2) / rect.height;
});

// تدوير تلقائي
function animate(){
  requestAnimationFrame(animate);
  pyramid.rotation.y += 0.01 + mouseX * 0.05;
  pyramid.rotation.x += 0.005 + mouseY * 0.02;
  renderer.render(scene, camera);
}
animate();

// جعل الحجم متجاوب
window.addEventListener('resize', () => {
  const w = container.clientWidth;
  const h = container.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
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

// // /* ======================================================
//    5) Navbar Background on Scroll
//    ======================================================

  window.addEventListener('scroll', function() {
  const navbar = document.getElementById('mainNavbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  });

   
   
   
   
   
   
  
// window.addEventListener("scroll", () => {
//   const nav = document.querySelector(".navbar");
//   if (!nav) return;
//   if (window.scrollY > 50) nav.classList.add("scrolled");
//   else nav.classList.remove("scrolled");
// });

      // Navbar active link on scroll
      // const sections = document.querySelectorAll('section, header');
      // window.addEventListener('scroll', () => {
      //   let current = '';
      //   sections.forEach(sec => {
      //     const top = sec.offsetTop - 80;
      //     if(window.scrollY >= top) current = sec.id || 'hero';
      //   });
      //   document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
      //   const activeLink = document.querySelector('.nav-link[href="#' + current + '"]');
      //   if(activeLink) activeLink.classList.add('active');
      // });
      // // smooth scroll for nav
      // document.querySelectorAll('a.nav-link').forEach(a => {
      //   a.addEventListener('click', function(e){
      //     e.preventDefault();
      //     const href = this.getAttribute('href');
      //     document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      //   });
      // });

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

