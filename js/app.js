/* ============================================================
   IT-Tea.org — Core Application JS
   System-aware theme, syllabus tabs, accordions, mobile nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initSyllabusTabs();
  initSyllabusAccordions();
  initScrollAnimations();
  initSmoothScroll();
  initImageLightbox();
});

/* ============================================================
   THEME  — System-aware (prefers-color-scheme) + manual toggle
   ============================================================ */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('ittea-theme');

  // If user previously picked a theme, apply it
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
  // Otherwise, no data-theme attribute → CSS @media handles it

  updateThemeIcon(toggle);

  toggle.addEventListener('click', () => {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ittea-theme', next);
    updateThemeIcon(toggle);
  });

  // Listen for system changes (only if no manual override)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('ittea-theme')) {
      updateThemeIcon(toggle);
    }
  });
}

function getEffectiveTheme() {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit) return explicit;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeIcon(toggle) {
  const theme = getEffectiveTheme();
  const icon = toggle.querySelector('i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
    toggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    icon.className = 'fas fa-moon';
    toggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

/* ============================================================
   MOBILE NAV
   ============================================================ */
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('header-nav');
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   SYLLABUS FILTER TABS — nothing visible until a tab is clicked
   ============================================================ */
function initSyllabusTabs() {
  const tabs = document.querySelectorAll('.syllabus-tab');
  const grades = document.querySelectorAll('.syllabus-grade');
  if (!tabs.length || !grades.length) return;

  // Hide all grades on page load
  grades.forEach(g => g.classList.add('hidden'));

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const wasActive = tab.classList.contains('active');

      // Deactivate all tabs
      tabs.forEach(t => t.classList.remove('active'));

      if (wasActive) {
        // Clicking active tab again — hide everything
        grades.forEach(g => g.classList.add('hidden'));
      } else {
        // Activate this tab and show its grade
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        grades.forEach(grade => {
          if (grade.dataset.grade === filter) {
            grade.classList.remove('hidden');
          } else {
            grade.classList.add('hidden');
          }
        });
      }
    });
  });
}

/* ============================================================
   SYLLABUS UNIT ACCORDIONS + COLLAPSIBLE TERMS
   ============================================================ */
function initSyllabusAccordions() {
  // ── Unit-level accordions (same as before, no auto-open) ──
  const units = document.querySelectorAll('.syllabus-unit');
  units.forEach(unit => {
    const toggle = unit.querySelector('.unit-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isOpen = unit.classList.contains('open');
      unit.classList.toggle('open');
      toggle.setAttribute('aria-expanded', !isOpen);
    });
  });

  // ── Dynamically wrap term-labels + their units into term-groups ──
  document.querySelectorAll('.term-label').forEach(label => {
    // Add chevron icon to the label
    const chevron = document.createElement('i');
    chevron.className = 'fas fa-chevron-down term-chevron';
    label.appendChild(chevron);

    // Collect all sibling elements following this label until next term-label
    const siblings = [];
    let next = label.nextElementSibling;
    while (next && !next.classList.contains('term-label') && !next.classList.contains('grade-header')) {
      siblings.push(next);
      next = next.nextElementSibling;
    }

    // Create wrapper: <div class="term-group"> ... </div>
    const group = document.createElement('div');
    group.className = 'term-group';

    // Create content container — explicitly hidden
    const content = document.createElement('div');
    content.className = 'term-content';
    content.style.display = 'none';

    // Insert group before the label, then move label + units inside
    label.parentNode.insertBefore(group, label);
    group.appendChild(label);
    siblings.forEach(s => content.appendChild(s));
    group.appendChild(content);

    // Toggle on click
    label.addEventListener('click', () => {
      const isOpen = group.classList.toggle('open');
      content.style.display = isOpen ? 'block' : 'none';
    });
  });
}

/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  // Add animate-target class to elements
  const targets = document.querySelectorAll(
    '.lo-card, .lab-card, .assessment-card, .syllabus-unit'
  );

  targets.forEach((el, i) => {
    el.classList.add('animate-target');
    // Add stagger class (cycle through 1-4)
    const stagger = (i % 4) + 1;
    el.classList.add(`stagger-${stagger}`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   IMAGE LIGHTBOX — fullscreen view on click
   ============================================================ */
function initImageLightbox() {
  const images = document.querySelectorAll('.lesson-image-block img');
  if (!images.length) return;

  // Create lightbox overlay once
  const overlay = document.createElement('div');
  overlay.className = 'image-lightbox';
  overlay.innerHTML = '<button class="image-lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('img');
  const lbClose = overlay.querySelector('.image-lightbox-close');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  images.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  overlay.addEventListener('click', (e) => {
    if (e.target !== lbImg) closeLightbox();
  });
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
