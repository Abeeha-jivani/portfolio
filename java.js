// wait until the DOM is ready
 document.addEventListener('DOMContentLoaded', () => {
  // pick **sab** anchors jinme data-target hai
  const links = document.querySelectorAll('a[data-target]');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();   // default jump off
      const selector = link.dataset.target;           // ".about" / ".skills" / ...
      const section  = document.querySelector(selector);

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'     // top align; use 'center' if you prefer
        });
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');

  // Use IntersectionObserver if supported  ➜ buttery smooth & efficient
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);           // animate only once
        }
      });
    }, { threshold: 0.15 });   // fire when 15 % visible

    reveals.forEach(el => obs.observe(el));
  } else {
    // Fallback for very old browsers (simple scroll handler)
    const onScroll = () => {
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();                // run once on load
  }
});