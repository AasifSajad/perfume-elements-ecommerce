// Shopping Cart Functionality
// Manages the shopping cart state and UI updates

let cart = JSON.parse(localStorage.getItem('perfumeCart')) || [];

// Add product to cart
function addToCart(productId) {
  const product = productData.find(p => p.id === productId);
  if (!product) return;

  // Check if product already in cart
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  }

  // Save to localStorage
  localStorage.setItem('perfumeCart', JSON.stringify(cart));

  // Update UI
  updateCartIcon();
  showCartNotification('Added to cart!');

  // Update cart section if visible
  updateCartSection();
}

// Update cart icon count
function updateCartIcon() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'block' : 'none';
  }
}

// Update cart section display
function updateCartSection() {
  const cartSection = document.getElementById('cart-section');
  const cartItemsDiv = document.getElementById('cart-items');

  if (!cartSection || !cartItemsDiv) return;

  if (cart.length === 0) {
    cartSection.style.display = 'none';
    return;
  }

  cartSection.style.display = 'block';

  let total = 0;
  let html = '';

  cart.forEach(item => {
    total += item.price * item.quantity;
    html += `
      <div style="display: flex; align-items: center; gap: 1rem; padding: 0.8rem 0;">
        <img src="images/${item.image}" width="50" height="50" alt="${item.name}" style="object-fit: cover;">
        <div>
          <span style="font-weight: bold;">${item.name}</span>
          <span>×${item.quantity}</span>
        </div>
      </div>
    `;
  });

  html += `
    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e0e0e0;">
      <h3>Total: $${total.toFixed(2)}</h3>
    </div>
  `;

  cartItemsDiv.innerHTML = html;
}

// Show toast notification
function showCartNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '2rem';
  notification.style.right = '2rem';
  notification.style.background = 'var(--primary)';
  notification.style.color = 'var(--card)';
  notification.style.padding = '1rem 1.5rem';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = 'var(--shadow)';
  notification.style.zIndex = '1000';
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartIcon();
  updateCartSection();
});

// Export for use in HTML
window.addToCart = addToCart;
window.updateCartIcon = updateCartIcon;