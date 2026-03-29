const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const setActiveNavLink = () => {
  let currentId = 'home';

  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (top >= offset && top < offset + height) {
      currentId = section.id;
    }
  });

  navLinkItems.forEach(link => {
    const target = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', target === currentId);
  });
};

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach(card => {
      const matches = category === 'All' || card.dataset.category === category;
      card.classList.toggle('hidden', !matches);
    });
  });
});

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = contactForm.elements["name"].value;
    const email = contactForm.elements["email"].value;
    const subjectInput = contactForm.elements["subject"].value;
    const message = contactForm.elements["message"].value;

    const subject = encodeURIComponent(subjectInput);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:ivan@cozmulici.com?subject=${subject}&body=${body}`;

    contactForm.reset();
  });
}
