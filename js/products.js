// Products Array - All products data
const products = [
    {
        id: 1,
        name: "15-inch Macbook Air 2TB",
        category: "Laptop",
        price: 98.3,
        colors: 6,
        image: "/public/ai/laptop1.png",
        badge: "Best Seller",
        badgeType: "red",
        specs: {
            resolution: "3024 × 1964 pixels",
            gpu: "10 Core GPU",
            cpu: "8 Core CPU",
            ssd: "2TB",
            webcam: "1080p FaceTime HD camera",
            technology: "Liquid Retina XDR display"
        }
    },
    {
        id: 2,
        name: "Airpods Max",
        category: "Headphones",
        price: 98.3,
        colors: 4,
        image: "/public/ai/headphone.png",
        badge: "Extra 20% off",
        badgeType: "green"
    },
    {
        id: 3,
        name: "Apple TV 4k Wifi",
        category: "Home Appliance",
        price: 98.3,
        colors: 1,
        image: "/public/ai/monitor.png",
        badge: "Sustainable Materials",
        badgeType: "blue"
    },
    {
        id: 4,
        name: "Iphone 13 Pro",
        category: "Phone",
        price: 98.3,
        colors: 6,
        image: "/public/ai/iphone.png",
        badge: "Best Seller",
        badgeType: "red"
    },
    {
        id: 5,
        name: "Apple Smart Watch",
        category: "Watch",
        price: 98.3,
        colors: 4,
        image: "/public/ai/head_pack.png",
        badge: "Extra 20% off",
        badgeType: "green"
    },
    {
        id: 6,
        name: "Air Pods Pro",
        category: "Headphones",
        price: 98.3,
        colors: 1,
        image: "/public/ai/phone2.png",
        badge: "Best Seller",
        badgeType: "red"
    },
    {
        id: 7,
        name: "Adjustable Laptop Riser",
        category: "Home Appliance",
        price: 98.3,
        colors: 6,
        image: "/public/ai/laptop_gaming.png",
        badge: "Extra 20% off",
        badgeType: "green"
    },
    {
        id: 8,
        name: "Ipad Pro",
        category: "Phone",
        price: 98.3,
        colors: 1,
        image: "/public/ai/apple_pack.png",
        badge: "Best Seller",
        badgeType: "red"
    },
    {
        id: 9,
        name: "14-inch Macbook Pro 12 Black",
        category: "Laptop",
        price: 98.3,
        colors: 4,
        image: "/public/ai/hero.png",
        badge: "Extra 10% off",
        badgeType: "green"
    },
    {
        id: 10,
        name: "Phone",
        category: "Phone",
        price: 98.3,
        colors: 6,
        image: "/public/ai/phone1.png",
        badge: "Best Seller",
        badgeType: "red"
    },
    {
        id: 11,
        name: "Apple Watch Ultra 2",
        category: "Watch",
        price: 98.3,
        colors: 4,
        image: "/public/ai/phone2.png",
        badge: "Sustainable Materials",
        badgeType: "blue"
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
        <a href="./productDetails.html?id=${product.id}" class="product-card">
            <div class="product-image">
                ${product.badge ? `<span class="product-badge badge-${product.badgeType}">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" onerror="this.src='/public/ai/ai.png'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <span>${product.colors} ${product.colors === 1 ? 'Colour' : 'Colour'}</span>
                </div>
            </div>
        </a>
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

