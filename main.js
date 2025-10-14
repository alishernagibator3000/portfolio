document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"], .btn-contact');
  if (!link) return;

  e.preventDefault();

  const targetSelector = link.classList.contains('btn-contact')
    ? '#contact'
    : link.getAttribute('href');
  const target = document.querySelector(targetSelector);

  if (!target) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start'
  });
});


const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    alert('Thank you for your message!');

    contactForm.reset();
  });
}


const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.project-item, .about-content, .contact-grid').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});