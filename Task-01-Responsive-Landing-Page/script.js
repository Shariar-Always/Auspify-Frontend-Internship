/**
 * NexFlow AI — Modern Landing Page Interactions
 * Author: Shariar Ahamed Ripon
 * Domain: Auspify Technologies Frontend Internship
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initActiveNavOnScroll();
  initPlatformTabs();
  initBillingToggle();
  initFaqAccordion();
  initCtaForm();
});

/* --------------------------------------------------------------------------
   1. Sticky Header & Blur on Scroll
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!mobileToggle || !mobileDrawer) return;

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  mobileToggle.addEventListener('click', openDrawer);

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  // Close on drawer link click
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Highlight Active Nav Item on Scroll
   -------------------------------------------------------------------------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

/* --------------------------------------------------------------------------
   4. Interactive Platform Tabs
   -------------------------------------------------------------------------- */
function initPlatformTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (!tabButtons.length || !tabPanes.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Update tab pane active state
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.getAttribute('id') === targetTabId) {
          pane.classList.add('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Pricing Billing Switcher (Monthly vs Yearly)
   -------------------------------------------------------------------------- */
function initBillingToggle() {
  const billingToggle = document.getElementById('billingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const yearlyLabel = document.getElementById('yearlyLabel');
  const priceAmounts = document.querySelectorAll('.pricing-card .amount');
  const proCard = document.getElementById('pricingPro');
  const enterpriseCard = document.getElementById('pricingEnterprise');

  if (!billingToggle) return;

  const updatePricing = () => {
    const isYearly = !billingToggle.checked; // default state is yearly (save 25%)

    if (isYearly) {
      yearlyLabel.classList.add('active');
      monthlyLabel.classList.remove('active');

      priceAmounts.forEach(amt => {
        amt.textContent = amt.getAttribute('data-yearly');
      });

      if (proCard) {
        const note = proCard.querySelector('.billing-note');
        if (note) note.textContent = 'Billed annually ($348/yr)';
      }
      if (enterpriseCard) {
        const note = enterpriseCard.querySelector('.billing-note');
        if (note) note.textContent = 'Billed annually ($1,188/yr)';
      }
    } else {
      monthlyLabel.classList.add('active');
      yearlyLabel.classList.remove('active');

      priceAmounts.forEach(amt => {
        amt.textContent = amt.getAttribute('data-monthly');
      });

      if (proCard) {
        const note = proCard.querySelector('.billing-note');
        if (note) note.textContent = 'Billed monthly ($39/mo)';
      }
      if (enterpriseCard) {
        const note = enterpriseCard.querySelector('.billing-note');
        if (note) note.textContent = 'Billed monthly ($129/mo)';
      }
    }
  };

  billingToggle.addEventListener('change', updatePricing);
  monthlyLabel.addEventListener('click', () => {
    billingToggle.checked = true;
    updatePricing();
  });
  yearlyLabel.addEventListener('click', () => {
    billingToggle.checked = false;
    updatePricing();
  });
}

/* --------------------------------------------------------------------------
   6. FAQ Accordion Interaction
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const isOpen = currentItem.classList.contains('active');

      // Close all items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      // If it wasn't open, open it
      if (!isOpen) {
        currentItem.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Call to Action Form Validation & Feedback
   -------------------------------------------------------------------------- */
function initCtaForm() {
  const form = document.getElementById('ctaForm');
  const emailInput = document.getElementById('ctaEmail');
  const feedback = document.getElementById('formFeedback');

  if (!form || !emailInput || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      feedback.textContent = 'Please enter a valid work email address.';
      feedback.style.color = '#f43f5e';
      return;
    }

    feedback.textContent = `🚀 Welcome aboard! We've sent a 14-day trial invitation to ${email}.`;
    feedback.style.color = '#10b981';
    emailInput.value = '';

    setTimeout(() => {
      feedback.textContent = '';
    }, 6000);
  });
}
