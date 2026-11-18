// Checkout & Payment Processing
// Handles the checkout flow and payment integration

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the cart page
  const cartSection = document.getElementById('cart-section');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!cartSection || !checkoutBtn) return;

  // Calculate total from cart
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  // Display total
  const totalElement = cartSection.querySelector('h3');
  if (totalElement) {
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Checkout button click
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showNotification('Your cart is empty', 'error');
      return;
    }

    // Show checkout modal
    showCheckoutModal();
  });
});

// Show checkout modal
function showCheckoutModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>Checkout</h2>
      <form id="checkout-form">
        <div class="form-group">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" required>
        </div>
        <div class="form-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="address">Shipping Address</label>
          <textarea id="address" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label for="payment-method">Payment Method</label>
          <select id="payment-method" required>
            <option value="">Select payment method</option>
            <option value="stripe">Stripe (Credit Card)</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Place Order</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = 'flex';

  // Close button
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.removeChild(modal);
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.removeChild(modal);
    }
  });

  // Form submission
  const form = document.getElementById('checkout-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      paymentMethod: document.getElementById('payment-method').value
    };

    // Process payment based on method
    processPayment(formData);
  });
}

// Process payment
function processPayment(formData) {
  const paymentMethod = formData.paymentMethod;

  if (paymentMethod === 'stripe') {
    // In a real implementation, integrate with Stripe API
    processStripePayment(formData);
  } else if (paymentMethod === 'cod') {
    // Cash on delivery
    completeOrder(formData);
  }
}

// Simulate Stripe payment
function processStripePayment(formData) {
  showNotification('Processing payment with Stripe...', 'info');

  setTimeout(() => {
    // Simulate successful payment
    completeOrder(formData);
  }, 2000);
}

// Complete the order
function completeOrder(formData) {
  // Clear the cart
  cart = [];
  localStorage.setItem('perfumeCart', JSON.stringify(cart));

  // Update UI
  updateCartIcon();
  updateCartSection();

  // Show success modal
  showSuccessModal(formData);

  // Hide cart modal and section
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) cartModal.style.display = 'none';

  const cartSection = document.getElementById('cart-section');
  if (cartSection) cartSection.style.display = 'none';

  showNotification('Order placed successfully!', 'success');
}

// Show success modal
function showSuccessModal(formData) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 500px; text-align: center;">
      <span class="close-modal">&times;</span>
      <div style="width: 80px; height: 80px; border: 4px solid var(--primary); border-radius: 50%; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 4rem;">✓</span>
      </div>
      <h2>Order Confirmed!</h2>
      <p>Your order has been successfully placed.</p>
      <p>Order ID: #${Math.floor(1000 + Math.random() * 8999)}</p>
      <p>Total Paid: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
      <p>Ship to: ${formData.firstName} ${formData.lastName}</p>
      <p>Email: ${formData.email}</p>
      <p>Address: ${formData.address}</p>
      <button style="margin-top: 1.5rem; width: 100%;" class="btn btn-primary">Continue Shopping</button>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = 'flex';

  // Close button
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.removeChild(modal);
  });

  // Continue shopping button
  modal.querySelector('button').addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.removeChild(modal);
  });

  // Remove modal after animation
  setTimeout(() => {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  }, 3000);
}

// Show notification
function showNotification(message, type = 'success') {
  const colors = {
    success: { bg: 'var(--success)', text: 'white' },
    error: { bg: 'var(--danger)', text: 'white' },
    info: { bg: '#3b82f6', text: 'white' }
  };

  const color = colors[type] || colors.success;

  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '2rem';
  notification.style.right = '2rem';
  notification.style.background = color.bg;
  notification.style.color = color.text;
  notification.style.padding = '1rem 1.5rem';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = 'var(--shadow)';
  notification.style.zIndex = '1000';
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateCartIcon();
});