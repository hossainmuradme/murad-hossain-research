document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    }));
  }
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-filter]');
    const targetSelector = group.getAttribute('data-filter-group');
    const items = document.querySelectorAll(targetSelector);
    buttons.forEach(button => button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      buttons.forEach(b => b.classList.toggle('active', b === button));
      items.forEach(item => {
        const categories = (item.getAttribute('data-category') || '').split(' ');
        item.hidden = !(filter === 'all' || categories.includes(filter));
      });
    }));
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
    };
    window.addEventListener('scroll', update, {passive:true}); update();
  }
});
