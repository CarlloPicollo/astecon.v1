// Custom cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  follower.style.left = e.clientX + 'px';
  follower.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .service-card, .client-card').forEach(el => {
  el.addEventListener('mouseenter', () => follower.style.transform = 'translate(-50%, -50%) scale(1.4)');
  el.addEventListener('mouseleave', () => follower.style.transform = 'translate(-50%, -50%) scale(1)');
});

// Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
toggle?.addEventListener('click', () => {
  const open = menu.style.display === 'flex';
  menu.style.display = open ? 'none' : 'flex';
  if (!open) {
    Object.assign(menu.style, {
      flexDirection: 'column',
      position: 'absolute',
      top: '100%',
      left: '0',
      right: '0',
      background: 'rgba(248,247,244,0.98)',
      padding: '1.8rem',
      gap: '1.2rem',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    });
  }
});

// Reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Canvas particles
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  resize();
  addEventListener('resize', resize);
  class P {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.s = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.o = Math.random() * 0.35 + 0.08;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(184,149,106,${this.o})`;
      ctx.fill();
    }
  }
  for (let i = 0; i < 55; i++) particles.push(new P());
  (function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(anim);
  })();
}

// Tilt
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// Form → WhatsApp
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const nome = f.nome.value.trim();
  const email = f.email.value.trim();
  const assunto = f.assunto.value.trim();
  const msg = f.mensagem.value.trim();
  const text = `Olá! Meu nome é ${nome} (${email}).%0AAssunto: ${assunto}%0A%0A${msg}`;
  window.open(`https://wa.me/556733845075?text=${text}`, '_blank');
  f.reset();
});

// Smooth anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const t = document.querySelector(id);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
