
function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

let currentProductId = parseInt(getQueryParam("id") || "9", 10);
let currentProduct =
    typeof products !== "undefined"
        ? products.find((p) => p.id === currentProductId) || products.find((p) => p.id === 9)
        : null;

let quantity = 2;

function changeQuantity(delta) {
    quantity = Math.max(1, quantity + delta);
    document.getElementById('quantityValue').textContent = quantity;
}

function changeMainImage(imageSrc) {
    document.getElementById('mainProductImage').src = imageSrc;
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === imageSrc) {
            thumb.classList.add('active');
        }
    });
}

let thumbnailScrollPosition = 0;

function navigateThumbnails(direction) {
    const thumbnailsWrapper = document.querySelector('.thumbnails-wrapper');
    const thumbnails = document.querySelector('.thumbnails');
    const thumbnailWidth = 95;
    
    thumbnailScrollPosition += direction * thumbnailWidth;
    
    const maxScroll = thumbnails.scrollWidth - thumbnailsWrapper.offsetWidth;
    thumbnailScrollPosition = Math.max(0, Math.min(thumbnailScrollPosition, maxScroll));
    
    thumbnails.style.transform = `translateX(-${thumbnailScrollPosition}px)`;
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = section.previousElementSibling;
    const toggle = header.querySelector('.section-toggle');
    
    section.classList.toggle('collapsed');
    
    if (section.classList.contains('collapsed')) {
        if (sectionId === 'reviews') {
            toggle.textContent = '▼';
        } else {
            toggle.textContent = '+';
        }
    } else {
        if (sectionId === 'reviews') {
            toggle.textContent = '▼';
        } else {
            toggle.textContent = '−';
        }
    }
}

function loadRelatedProducts() {
    if (typeof products !== "undefined") {
        const relatedProducts = products
            .filter(
                (p) =>
                    (!currentProduct || p.category === currentProduct.category) &&
                    (!currentProduct || p.id !== currentProduct.id)
            )
            .slice(0, 3);
        const relatedGrid = document.getElementById('relatedProductsGrid');
        
        relatedGrid.innerHTML = relatedProducts.map(product => `
            <div class="related-product-card" onclick="window.location.href='productDetails.html?id=${product.id}'">
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
}

document.addEventListener('DOMContentLoaded', function() {
    loadRelatedProducts();
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            changeMainImage(this.src);
        });
    });
    
    const addToBagBtn = document.querySelector('.btn-add-to-bag');
    if (addToBagBtn) {
        addToBagBtn.addEventListener('click', function() {
            alert(`Added ${quantity} item(s) to bag!`);
            console.log(`Added ${quantity} item(s) to bag!`)
        });
    }
    
    const favoriteBtn = document.querySelector('.btn-favorite');
    if (favoriteBtn) {
        let isFavorited = false;
        favoriteBtn.addEventListener('click', function() {
            isFavorited = !isFavorited;
            const heartIcon = this.querySelector('span');
            heartIcon.textContent = isFavorited ? '♥' : '♡';
            this.style.color = isFavorited ? '#ff3366' : '#1a1a1a';
            console.log("Added item to favourites");
            alert("Added item to favourites");
        });
    }
    
    const compareBtn = document.querySelector('.btn-compare');
    if (compareBtn && currentProduct) {
        compareBtn.addEventListener('click', function () {
            const category = encodeURIComponent(currentProduct.category);
            const baseId = currentProduct.id;
            window.location.href = `compare.html?baseId=${baseId}&category=${category}`;
        });
    }
});

