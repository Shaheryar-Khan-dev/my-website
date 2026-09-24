// ============================================
// SUMMIT & CLARKE LEGAL ASSOCIATES
// Main JavaScript
// ============================================

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// MOBILE MENU
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  const burger = document.getElementById('hamburger');
  if (nav) nav.classList.toggle('open');
  if (burger) burger.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('navLinks');
    if (nav) nav.classList.remove('open');
  });
});

// TESTIMONIALS SLIDER
let currentSlide = 0;
const slides = document.querySelectorAll('.testi-card');
const dots = document.querySelectorAll('.dot');
let autoSlide;

function goToSlide(index) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

if (slides.length) {
  autoSlide = setInterval(nextSlide, 5000);
  document.querySelector('.testi-slider')?.addEventListener('mouseenter', () => clearInterval(autoSlide));
  document.querySelector('.testi-slider')?.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
  });
}

// FAQ ACCORDION
function toggleFAQ(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-q').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// NEWSLETTER
function submitNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ Subscribed';
  btn.style.background = '#2d6a4f';
  btn.style.borderColor = '#2d6a4f';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
    btn.style.borderColor = '';
  }, 3000);
}

// CONTACT FORM VALIDATION
function validateContact(e) {
  e.preventDefault();
  let valid = true;
  const fields = ['contactName','contactEmail','contactPhone','contactMessage'];
  const labels = { contactName:'Full name', contactEmail:'Valid email', contactPhone:'Phone number', contactMessage:'Message' };

  fields.forEach(id => {
    const el = document.getElementById(id);
    const err = document.getElementById(id + 'Err');
    if (!el || !err) return;
    if (!el.value.trim()) {
      err.textContent = labels[id] + ' is required.';
      err.classList.add('show');
      valid = false;
    } else if (id === 'contactEmail' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
      err.textContent = 'Please enter a valid email address.';
      err.classList.add('show');
      valid = false;
    } else {
      err.classList.remove('show');
    }
  });

  if (valid) {
    const success = document.getElementById('formSuccess');
    const form = document.getElementById('contactForm');
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';
  }
  return false;
}

// LIVE CHAT
function toggleChat() {
  const win = document.getElementById('chatWindow');
  if (win) win.classList.toggle('open');
}

function sendChat(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('chatInput');
  const body = document.querySelector('.chat-body');
  if (!input || !body || !input.value.trim()) return;
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.textContent = input.value;
  body.appendChild(userMsg);
  input.value = '';
  body.scrollTop = body.scrollHeight;
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg bot';
    botMsg.textContent = "Thank you for reaching out. A member of our team will be with you shortly. For urgent matters, please call +1 (212) 540-7800.";
    body.appendChild(botMsg);
    body.scrollTop = body.scrollHeight;
  }, 1200);
}

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// COUNTER ANIMATION
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 20);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.hstat-num');
      const targets = [25, 1200, 98, 42];
      const suffixes = ['+', '+', '%', ''];
      nums.forEach((num, i) => animateCounter(num, targets[i], suffixes[i]));
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// SET ACTIVE NAV LINK
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});