/* ===========================
   NAVBAR — scroll behaviour
   =========================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


/* ===========================
   HAMBURGER MENU
   =========================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* ===========================
   SCROLL REVEAL
   =========================== */
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings that appear together
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add staggered delay to siblings in the same parent
reveals.forEach((el) => {
  const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
  const idx = siblings.indexOf(el);
  el.dataset.delay = idx * 80;
  observer.observe(el);
});


/* ===========================
   PROJECT MODALS
   =========================== */
const modalData = {
  clinic: {
    tag: 'Backend · Healthcare',
    title: 'Clinic Management Dashboard',
    description: 'A comprehensive patient data management platform built for a healthcare environment. The system handles patient records, appointment scheduling, and role-based access for administrators, doctors, and reception staff.',
    stats: [
      { num: '40%', label: 'Query performance improvement' },
      { num: 'RBAC', label: 'Multi-role access control' },
    ],
    tech: ['Java', 'PostgreSQL', 'Spring Boot', 'MVC Architecture', 'REST APIs', 'RBAC'],
    github: 'https://github.com/NeoMudau',
  },
  chatbot: {
    tag: 'NLP · Hackathon',
    title: 'Mental Health Chatbot',
    description: 'Built during the MAISH Hackathon 2024, this chatbot provides mental health support conversations in African languages — making psychological resources accessible to communities that are often underserved by English-only tools. Achieved 3rd place against university teams across South Africa.',
    stats: [
      { num: '🏆 3rd', label: 'MAISH Hackathon 2024' },
      { num: 'Multi', label: 'African language support' },
    ],
    tech: ['JavaScript', 'NLP', 'Zero-budget deployment', 'Conversational AI'],
    github: 'https://github.com/NeoMudau',
  },
};

function openModal(key) {
  const data = modalData[key];
  if (!data) return;

  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <span class="modal-tag">${data.tag}</span>
    <h2>${data.title}</h2>
    <p>${data.description}</p>

    <div class="modal-row">
      ${data.stats.map(s => `
        <div class="modal-stat">
          <span class="num">${s.num}</span>
          <span class="lbl">${s.label}</span>
        </div>
      `).join('')}
    </div>

    <p style="font-size:0.78rem; color: var(--text-muted); font-family: var(--font-head); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.5rem;">Tech Stack</p>
    <div class="modal-tech">
      ${data.tech.map(t => `<span>${t}</span>`).join('')}
    </div>

    <div class="modal-actions">
      <a href="${data.github}" target="_blank" class="btn btn-primary">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="display:inline;vertical-align:middle;margin-right:6px"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        View on GitHub
      </a>
      <button onclick="closeModal()" class="btn btn-outline">Close</button>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});


/* ===========================
   ACTIVE NAV LINK on scroll
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});