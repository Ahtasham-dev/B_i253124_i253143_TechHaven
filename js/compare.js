
function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

function buildSpecsHtml(product) {
    const defaults = {
        resolution: "3024 × 1964 pixels",
        gpu: "10 Core GPU",
        cpu: "8 Core CPU",
        ssd: "1TB",
        webcam: "1080p FaceTime HD camera",
        technology: "Liquid Retina XDR display"
    };

    const specs = product.specs || defaults;

    return `
        <h3 class="specs-title">Specs</h3>
        <ul class="specs-list">
            <li><span class="spec-label">Resolution:</span><span class="spec-value">${specs.resolution}</span></li>
            <li><span class="spec-label">GPU:</span><span class="spec-value">${specs.gpu}</span></li>
            <li><span class="spec-label">CPU:</span><span class="spec-value">${specs.cpu}</span></li>
            <li><span class="spec-label">SSD:</span><span class="spec-value">${specs.ssd}</span></li>
            <li><span class="spec-label">WebCam:</span><span class="spec-value">${specs.webcam}</span></li>
            <li><span class="spec-label">Technology:</span><span class="spec-value">${specs.technology}</span></li>
        </ul>
    `;
}

function renderProductColumn(containerId, product) {
    const container = document.getElementById(containerId);
    if (!container || !product) return;

    container.innerHTML = `
        <div class="compare-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <h2 class="compare-title">${product.name}</h2>
        ${buildSpecsHtml(product)}
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    if (typeof products === "undefined") return;

    const baseId = parseInt(getQueryParam("baseId") || "9", 10);
    const category = getQueryParam("category");

    const baseProduct =
        products.find((p) => p.id === baseId) ||
        products.find((p) => p.id === 9);

    renderProductColumn("leftProduct", baseProduct);

    const sameCategoryProducts = products.filter(
        (p) =>
            p.id !== baseProduct.id &&
            (!category || p.category === category)
    );

    const selectEl = document.getElementById("compareSelect");
    if (!selectEl) return;

    selectEl.innerHTML = `
        <option value="">Select product to compare</option>
        ${sameCategoryProducts
            .map(
                (p) =>
                    `<option value="${p.id}">${p.name}</option>`
            )
            .join("")}
    `;

    selectEl.addEventListener("change", function () {
        const id = parseInt(this.value, 10);
        const product = products.find((p) => p.id === id);
        if (product) {
            renderProductColumn("rightProduct", product);
        }
    });

    if (sameCategoryProducts.length > 0) {
        const first = sameCategoryProducts[0];
        selectEl.value = first.id.toString();

        const rightColumn = document.querySelector(".product-column.divider");
        if (rightColumn) {
            rightColumn.id = "rightProduct";
        }
        renderProductColumn("rightProduct", first);
    }
});


