// Perfume Elements Product Catalog
// Data for the e-commerce platform

const productData = [
  {
    id: 1,
    name: "Rose Essential Oil",
    category: "Essential Oils",
    price: 29.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviewCount: 128,
    image: "rose-oil.svg",
    scentNotes: ["Rose", "Floral", "Sweet"],
    description: "Pure steam-distilled rose essential oil, 10ml. Top note for perfumery.",
    isFeatured: true,
    stock: 45
  },
  {
    id: 2,
    name: "Sandalwood Oil",
    category: "Essential Oils",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.9,
    reviewCount: 95,
    image: "sandalwood.svg",
    scentNotes: ["Sandalwood", "Woody", "Earthy"],
    description: "Premium sandalwood essential oil, 10ml. Base note, excellent fixative.",
    isFeatured: true,
    stock: 32
  },
  {
    id: 3,
    name: "Bergamot Essential Oil",
    category: "Essential Oils",
    price: 22.50,
    originalPrice: 27.50,
    rating: 4.5,
    reviewCount: 78,
    image: "bergamot.svg",
    scentNotes: ["Bergamot", "Citrus", "Fresh"],
    description: "Cold-pressed bergamot essential oil, 10ml. Top note, uplifting aroma.",
    isFeatured: false,
    stock: 67
  },
  {
    id: 4,
    name: "Jasmine Absolute",
    category: "Absolutes",
    price: 89.99,
    originalPrice: 109.99,
    rating: 5.0,
    reviewCount: 43,
    image: "jasmine.svg",
    scentNotes: ["Jasmine", "Floral", "Intense"],
    description: "Solvent-extracted jasmine absolute, 5ml. Heart note, deeply floral.",
    isFeatured: true,
    stock: 18
  },
  {
    id: 5,
    name: "Ambergris Resinoid",
    category: "Resinoids",
    price: 65.00,
    originalPrice: 79.99,
    rating: 4.7,
    reviewCount: 56,
    image: "ambergris.svg",
    scentNotes: ["Ambergris", "Marine", "Sweet"],
    description: "Ambergris resinoid, 5ml. Base note, marine-amber aroma. Rare and precious.",
    isFeatured: false,
    stock: 12
  },
  {
    id: 6,
    name: "Oakmoss Absolute",
    category: "Absolutes",
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.4,
    reviewCount: 89,
    image: "oakmoss.svg",
    scentNotes: ["Oakmoss", "Earthy", "Woody"],
    description: "Oakmoss absolute, 10ml. Base note, forest-like earthy aroma. Essential for chypre bases.",
    isFeatured: false,
    stock: 41
  },
  {
    id: 7,
    name: "Lavender Essential Oil",
    category: "Essential Oils",
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.6,
    reviewCount: 156,
    image: "lavender.svg",
    scentNotes: ["Lavender", "Herbal", "Fresh"],
    description: "Lavender essential oil, 10ml. Top note, calming and soothing. Very popular.",
    isFeatured: false,
    stock: 89
  }
];

// Scent notes for the "Shop by Notes" section
const noteData = [
  { name: "Floral", count: 12 },
  { name: "Woody", count: 8 },
  { name: "Citrus", count: 6 },
  { name: "Earthy", count: 7 },
  { name: "Sweet", count: 5 },
  { name: "Fresh", count: 9 },
  { name: "Spicy", count: 4 },
  { name: "Oriental", count: 3 }
];

// Render products to the DOM
function renderProducts(filterCategory = '', filterNote = '') {
  const productGrid = document.getElementById('product-grid');
  if (!productGrid) return;

  let html = '';

  productData.forEach(product => {
    // Filter by category if specified
    if (filterCategory && product.category !== filterCategory) {
      return;
    }

    // Filter by note if specified
    if (filterNote && !product.scentNotes.includes(filterNote)) {
      return;
    }

    const discount = product.originalPrice && product.originalPrice > product.price
      ? `<span class="product-price"><del>$${product.originalPrice.toFixed(2)}</del> $${product.price.toFixed(2)}</span>`
      : `<span class="product-price">$${product.price.toFixed(2)}</span>`;

    html += `
      <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-notes="${product.scentNotes.join(',')}">
        <div class="product-image">
          <img src="images/${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title">${product.name}</h3>
          ${discount}
          <div class="product-rating">
            ${'★'.repeat(Math.round(product.rating))}${('½'.repeat(product.rating % 1 > 0.5))}
            <span>(${product.reviewCount})</span>
          </div>
          <button class="btn btn-small" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });

  productGrid.innerHTML = html;
}

// Render notes buttons
function renderNotes() {
  const notesGrid = document.getElementById('notes-grid');
  if (!notesGrid) return;

  let html = '';

  noteData.forEach(note => {
    html += `
      <button class="note-btn" onclick="filterByNote('${note.name}')" data-note="${note.name}">
        ${note.name} <span style="font-size: 1rem; color: var(--text-muted);">(${note.count})</span>
      </button>
    `;
  });

  notesGrid.innerHTML = html;
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderNotes();
});

// Export for use in other modules
window.productData = productData;
renderProducts();