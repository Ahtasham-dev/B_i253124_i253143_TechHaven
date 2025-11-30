// Products Array - All products data
const products = [
    {
        id: 1,
        name: "15-inch Macbook Air 2TB",
        category: "Laptop",
        price: 98.30,
        colors: 6,
        image: "/public/products/15-inch-macbook-air-2tb-midnight.png",
        badge: "Best Seller",
        badgeType: "red"
    },
    {
        id: 2,
        name: "Airpods Max",
        category: "Headphones",
        price: 98.30,
        colors: 4,
        image: "/public/products/airpods-max.png",
        badge: "Extra 20% off",
        badgeType: "green"
    },
    {
        id: 3,
        name: "Apple TV 4k Wifi",
        category: "Home Appliance",
        price: 98.30,
        colors: 1,
        image: "/public/products/apple-tv-4k-wifi.png",
        badge: "Sustainable Materials",
        badgeType: "blue"
    },
    {
        id: 4,
        name: "Iphone 13 Pro",
        category: "Phone",
        price: 98.30,
        colors: 6,
        image: "/public/products/apple-iphone-15-pro-1tb-blue-titanium.png",
        badge: "Best Seller",
        badgeType: "red"
    },
    {
        id: 5,
        name: "Apple Smart Watch",
        category: "Watch",
        price: 98.30,
        colors: 4,
        image: "/public/products/apple-watch-series-9-aluminum.png",
        badge: "Extra 20% off",
        badgeType: "green"
    },
    {
        id: 6,
        name: "Air Pods Pro",
        category: "Headphones",
        price: 98.30,
        colors: 1,
        image: "/public/products/airpods-pro-2nd-generation.png",
        badge: "Best Seller",
        badgeType: "red"
    },
    {
        id: 7,
        name: "Adjustable Laptop Riser",
        category: "Home Appliance",
        price: 98.30,
        colors: 6,
        image: "/public/products/silver-lamicall-adjustable-laptop-riser.png",
        badge: "Extra 20% off",
        badgeType: "green"
    },
    {
        id: 8,
        name: "Ipad Pro",
        category: "Phone",
        price: 98.30,
        colors: 1,
        image: "/public/products/11-inch-ipad-pro-512gb-space-gray.png",
        badge: "Best Seller",
        badgeType: "red"
    },
    {
        id: 9,
        name: "14-inch Macbook Pro 12 Black",
        category: "Laptop",
        price: 98.30,
        colors: 4,
        image: "/public/products/14-inch-macbook-pro-12-core-1tb-space-black.png",
        badge: "Extra 10% off",
        badgeType: "green"
    },
    {
        id: 10,
        name: "Phone",
        category: "Phone",
        price: 98.30,
        colors: 6,
        image: "/public/products/apple-iphone-14-128gb-blue.png",
        badge: "Best Seller",
        badgeType: "red"
    },
    {
        id: 11,
        name: "Apple Watch Ultra 2",
        category: "Watch",
        price: 98.30,
        colors: 4,
        image: "/public/products/apple-watch-ultra-2.png",
        badge: "Sustainable Materials",
        badgeType: "blue"
    },
    {
        id: 12,
        name: "13-inch Macbok Air Gray",
        category: "Laptop",
        price: 98.30,
        colors: 1,
        image: "/public/products/13-inch-macbokk-air-256gb-space-gray.png",
        badge: "Extra 20% off",
        badgeType: "green"
    }
];

// Filter and Sort State
let filteredProducts = [...products];
let selectedCategories = [];
let selectedPriceRange = null;
let currentSort = 'default';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    renderProducts(products);
    updateProductCount(products.length);
});

// Setup event listeners for filters
function setupEventListeners() {
    // Category checkboxes
    const categoryCheckboxes = document.querySelectorAll('input[data-filter="category"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryFilter);
    });

    // Price radio buttons
    const priceRadios = document.querySelectorAll('input[data-filter="price"]');
    priceRadios.forEach(radio => {
        radio.addEventListener('change', handlePriceFilter);
    });
}

// Handle category filter
function handleCategoryFilter() {
    selectedCategories = [];
    const checkedBoxes = document.querySelectorAll('input[data-filter="category"]:checked');
    checkedBoxes.forEach(checkbox => {
        selectedCategories.push(checkbox.value);
    });
    
    applyFilters();
}

// Handle price filter
function handlePriceFilter() {
    const selectedRadio = document.querySelector('input[data-filter="price"]:checked');
    selectedPriceRange = selectedRadio ? selectedRadio.value : null;
    
    applyFilters();
}

// Apply all filters
function applyFilters() {
    filteredProducts = products.filter(product => {
        // Category filter
        const categoryMatch = selectedCategories.length === 0 || 
                             selectedCategories.includes(product.category);
        
        // Price filter
        let priceMatch = true;
        if (selectedPriceRange) {
            const price = product.price;
            switch(selectedPriceRange) {
                case '25-50':
                    priceMatch = price >= 25 && price <= 50;
                    break;
                case '50-100':
                    priceMatch = price >= 50 && price <= 100;
                    break;
                case '100-150':
                    priceMatch = price >= 100 && price <= 150;
                    break;
                case '150+':
                    priceMatch = price > 150;
                    break;
            }
        }
        
        return categoryMatch && priceMatch;
    });
    
    // Apply current sort
    applySort();
    
    // Render filtered products
    renderProducts(filteredProducts);
    updateProductCount(filteredProducts.length);
}

// Handle sorting
function handleSort() {
    currentSort = document.getElementById('sortSelect').value;
    applySort();
    renderProducts(filteredProducts);
}

// Apply sort to filtered products
function applySort() {
    switch(currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'default':
        default:
            // Reset to original order (by id)
            filteredProducts.sort((a, b) => a.id - b.id);
            break;
    }
}

// Render products to the grid
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products found matching your filters.</div>';
        return;
    }
    
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.badge ? `<span class="product-badge badge-${product.badgeType}">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" onerror="this.src='/public/products/apple-tv-4k-wifi.png'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <span>${product.colors} ${product.colors === 1 ? 'Colour' : 'Colour'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Update product count
function updateProductCount(count) {
    document.getElementById('productCount').textContent = count;
}

// Toggle filter section
function toggleFilter(filterId) {
    const filterContent = document.getElementById(filterId);
    const filterHeader = filterContent.previousElementSibling;
    const toggle = filterHeader.querySelector('.filter-toggle');
    
    filterContent.classList.toggle('collapsed');
    toggle.textContent = filterContent.classList.contains('collapsed') ? '+' : '−';
}

// Toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('filtersSidebar');
    const btn = document.getElementById('hideFiltersBtn');
    
    sidebar.classList.toggle('hidden');
    btn.textContent = sidebar.classList.contains('hidden') ? 'Show Filters' : 'Hide Filters';
}

// Export products array for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products };
}

