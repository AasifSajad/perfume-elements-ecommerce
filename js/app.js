// Main Application Initialization
// Ties together all the modules for the perfume e-commerce platform

document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart
  updateCartIcon();

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
}

// Make functions globally available
window.addToCart = addToCart;
window.updateCartIcon = updateCartIcon;