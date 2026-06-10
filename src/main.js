const sidebar = document.getElementById('sidebar');
const toggle = document.querySelector('.sidebar-toggle');
const navLinks = document.querySelectorAll('.sidebar-nav a');
const yearEl = document.getElementById('year');
const clockEl = document.getElementById('clock');

yearEl.textContent = new Date().getFullYear();

function updateClock() {
  const now = new Date();
  const dhaka = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
  const h = String(dhaka.getHours()).padStart(2, '0');
  const m = String(dhaka.getMinutes()).padStart(2, '0');
  clockEl.textContent = `${h}:${m}`;
}

updateClock();
setInterval(updateClock, 30000);

toggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = document.querySelectorAll('.block[id]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px' }
);

sections.forEach((section) => observer.observe(section));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
