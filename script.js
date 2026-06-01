/* =============================================
   CYBER SECURITY DEPARTMENT - MAIN SCRIPT
   ============================================= */

/* --- Mobile Menu Toggle --- */
document.addEventListener('DOMContentLoaded', function () {

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* --- Active Nav Link Highlight --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Scroll Reveal Animation --- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for grid items
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (entry.target.dataset.delay || 0));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* --- Assign stagger delays to grid children --- */
  document.querySelectorAll('.stats-grid, .objectives-grid, .faculty-grid, .gallery-grid, .vm-grid').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((child, i) => {
      child.dataset.delay = i * 80;
    });
  });

  /* --- Animated Counter --- */
  const counters = document.querySelectorAll('.stat-num[data-target]');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(ease * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    }

    requestAnimationFrame(update);
  }

  /* --- Gallery Filter --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* --- Lightbox --- */
  const lightbox = document.getElementById('lightbox');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', function () {
        const title = this.dataset.title || 'Gallery Image';
        const desc = this.dataset.desc || 'Department activity';
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* --- Contact Form --- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      let valid = true;
      const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');

      inputs.forEach(input => {
        input.style.borderColor = '';
        if (!input.value.trim()) {
          input.style.borderColor = '#e53935';
          valid = false;
        }
      });

      if (!valid) return;

      // Simulate submission
      const submitBtn = contactForm.querySelector('.btn-submit');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
      }, 1200);
    });
  }

  /* --- Navbar Shadow on Scroll --- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 8) {
        navbar.style.boxShadow = '0 4px 28px rgba(10,42,94,0.18)';
      } else {
        navbar.style.boxShadow = '0 2px 20px rgba(10,42,94,0.12)';
      }
    }, { passive: true });
  }

});