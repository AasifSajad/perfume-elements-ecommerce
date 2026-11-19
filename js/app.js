// Main Application Initialization
// Ties together all the modules for the perfume e-commerce platform

document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart
  updateCartIcon();

  // Initialize hero slider
  initHeroSlider();

  // Mobile menu toggle (for future expansion)
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Scroll reveal effect (for future pages)
  const observeOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Initialize all features
  initFeatures();
});

// Initialize hero slider
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtns = document.querySelectorAll('.hero-arrow.prev');
  const nextBtns = document.querySelectorAll('.hero-arrow.next');
  let currentSlide = 0;

  // Hide all slides first
  slides.forEach(slide => {
    slide.classList.remove('active', 'prev', 'next');
  });

  // Show first slide
  if (slides.length > 0) {
    slides[currentSlide].classList.add('active');
  }

  // Next slide
  function goToNextSlide() {
    // Hide current slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('prev');

    // Move to next
    currentSlide = (currentSlide + 1) % slides.length;

    // Show next slide
    slides[currentSlide].classList.remove('prev', 'next');
    slides[currentSlide].classList.add('active');

    // Update prev/next states
    updateSliderArrows();
  }

  // Previous slide
  function goToPrevSlide() {
    // Hide current slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('next');

    // Move to previous
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;

    // Show previous slide
    slides[currentSlide].classList.remove('prev', 'next');
    slides[currentSlide].classList.add('active');

    // Update prev/next states
    updateSliderArrows();
  }

  // Update arrow visibility
  function updateSliderArrows() {
    prevBtns.forEach(btn => {
      btn.style.display = currentSlide === 0 ? 'none' : 'block';
    });
    nextBtns.forEach(btn => {
      btn.style.display = currentSlide === slides.length - 1 ? 'none' : 'block';
    });
  }

  // Auto-advance every 5 seconds
  setInterval(goToNextSlide, 5000);

  // Event listeners for arrows
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToPrevSlide();
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToNextSlide();
    });
  });
}

// Initialize all features
function initFeatures() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add to cart buttons
  document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productCard = btn.closest('.product-card');
      const productId = parseInt(productCard.getAttribute('data-id'));
      addToCart(productId);
    });
  });

  // Filter by note buttons
  document.querySelectorAll('.note-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all note buttons
      document.querySelectorAll('.note-btn').forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      // Filter products by selected note
      const filterNote = btn.getAttribute('data-note');
      renderProducts('', filterNote);
    });
  });

  // Category filter buttons
  document.querySelectorAll('.category-tag').forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all category tags
      document.querySelectorAll('.category-tag').forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      // Filter products by selected category
      const filterCategory = btn.getAttribute('data-category');
      renderProducts(filterCategory, '');
    });
  });
}

// Make functions globally available
window.addToCart = addToCart;
window.updateCartIcon = updateCartIcon;