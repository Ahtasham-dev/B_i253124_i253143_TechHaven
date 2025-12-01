// Simple cart data for demo (matches the design)
const cartItems = [
  {
    id: 1,
    name: "14-inch Macbook Pro 12 Core 1TB space Black",
    category: "Laptop",
    sizeLabel: "Size 3",
    quantity: 2,
    price: 98.3,
    image: "/public/products/14-inch-macbook-pro-12-core-1tb-space-black.png",
    deliveryText: "Estimated arrival 24 Sep 2025",
  },
  {
    id: 2,
    name: "Iphone 13 Pro",
    category: "Phone",
    sizeLabel: "Size 1",
    quantity: 2,
    price: 104.26,
    image: "/public/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    deliveryText: "Delivered on 04 August",
  },
  {
    id: 3,
    name: "Apple TV 4K WIFI",
    category: "Home Appliance",
    sizeLabel: "Size 2",
    quantity: 2,
    price: 185.67,
    image: "/public/products/apple-tv-4k-wifi.png",
    deliveryText: "Delivered on 04 August",
  },
];

const DELIVERY_FEE = 2.0;

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function renderCart() {
  const listEl = document.getElementById("cartItemsList");
  if (!listEl) return;

  if (cartItems.length === 0) {
    listEl.innerHTML = '<p>Your cart is empty.</p>';
    updateSummary();
    updateCartCount();
    return;
  }

  listEl.innerHTML = cartItems
    .map(
      (item) => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-delivery">${item.deliveryText}</div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-category">${item.category}</div>
          <div class="cart-item-meta">
            <span>${item.sizeLabel}</span>
            <div class="cart-qty-control">
              <button class="cart-qty-button" data-action="decrease">−</button>
              <span class="cart-qty-value">${item.quantity}</span>
              <button class="cart-qty-button" data-action="increase">+</button>
            </div>
          </div>
        </div>
        <div class="cart-item-price-area">
          <span class="cart-item-price">${formatCurrency(item.price)}</span>
          <button class="cart-item-remove" title="Remove item">🗑</button>
        </div>
      </div>
    `
    )
    .join("");

  // Attach events for quantity and remove
  listEl.querySelectorAll(".cart-item").forEach((row) => {
    const id = parseInt(row.getAttribute("data-id"), 10);
    const item = cartItems.find((p) => p.id === id);
    if (!item) return;

    row.addEventListener("click", (e) => {
      const target = e.target;
      if (target.matches(".cart-qty-button")) {
        const action = target.getAttribute("data-action");
        if (action === "increase") {
          item.quantity += 1;
        } else if (action === "decrease" && item.quantity > 1) {
          item.quantity -= 1;
        }
        renderCart();
      } else if (target.matches(".cart-item-remove")) {
        const index = cartItems.findIndex((p) => p.id === id);
        if (index !== -1) {
          cartItems.splice(index, 1);
          renderCart();
        }
      }
    });
  });

  updateSummary();
  updateCartCount();
}

function updateSummary() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  const subtotalEl = document.getElementById("summarySubtotal");
  const deliveryEl = document.getElementById("summaryDelivery");
  const totalEl = document.getElementById("summaryTotal");

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (deliveryEl) deliveryEl.textContent = formatCurrency(delivery);
  if (totalEl) totalEl.textContent = formatCurrency(total);
}

function updateCartCount() {
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cartCount");
  if (badge) {
    badge.textContent = count.toString();
  }
}

document.addEventListener("DOMContentLoaded", renderCart);


