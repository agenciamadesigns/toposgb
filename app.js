const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-fixed', window.scrollY > 80);
});

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });

document.querySelectorAll('main section[id], header[id]').forEach(section => sectionObserver.observe(section));

const count = document.querySelector('[data-count]');
const countObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
  const goal = Number(count.dataset.count);
  let current = 0;
  const timer = setInterval(() => {
    current += 1;
    count.textContent = current;
    if (current >= goal) clearInterval(timer);
  }, 90);
  countObserver.disconnect();
});
countObserver.observe(count);

document.getElementById('quoteForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Hola Topos GB, quiero solicitar una cotización.\n\nNombre/empresa: ${data.get('nombre')}\nTeléfono: ${data.get('telefono')}\nServicio: ${data.get('servicio')}\nDetalles: ${data.get('mensaje')}`;
  window.open(`https://wa.me/526621674957?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
