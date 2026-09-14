const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2499,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
        description: "Comfortable wireless headphones with rich sound and a clean everyday design."
    },
    {
        id: 2,
        name: "Classic Wrist Watch",
        price: 4999,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",
        description: "A simple classic watch designed for everyday wear."
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 3499,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        description: "Lightweight running shoes with a comfortable fit."
    },
    {
        id: 4,
        name: "Smart Phone",
        price: 29999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80",
        description: "A modern smartphone built for performance and everyday use."
    },
    {
        id: 5,
        name: "Minimal Backpack",
        price: 1899,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
        description: "Clean and spacious backpack for college, work and travel."
    },
    {
        id: 6,
        name: "Smart Watch",
        price: 5999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
        description: "Track your day with a simple and modern smartwatch."
    },
    {
        id: 7,
        name: "Leather Wallet",
        price: 1299,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80",
        description: "Compact wallet with enough space for your everyday cards."
    },
    {
        id: 8,
        name: "Sunglasses",
        price: 1599,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
        description: "Classic sunglasses with a clean modern frame."
    }
];

let cart = JSON.parse(localStorage.getItem("nexoraCart")) || [];

function saveCart() {
    localStorage.setItem("nexoraCart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {

    const count = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}

function productCard(product) {

    return `
        <div class="product-card">

            <img
                src="${product.image}"
                class="product-image"
                alt="${product.name}"
            >

            <div class="product-info">

                <small>${product.category}</small>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${product.price.toLocaleString()}
                    </span>

                    <a
                        href="product.html?id=${product.id}"
                        class="view-btn">
                        View
                    </a>

                </div>

            </div>

        </div>
    `;
}

function loadFeaturedProducts() {

    const box = document.getElementById("featuredProducts");

    if (!box) return;

    box.innerHTML = products
        .slice(0, 4)
        .map(productCard)
        .join("");
}

function loadAllProducts(list = products) {

    const box = document.getElementById("allProducts");

    if (!box) return;

    if (list.length === 0) {
        box.innerHTML = "<p>No products found.</p>";
        return;
    }

    box.innerHTML = list.map(productCard).join("");
}

function filterProducts(category, button) {

    document.querySelectorAll(".filter").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    if (category === "all") {
        loadAllProducts(products);
    } else {
        const filtered = products.filter(
            product => product.category === category
        );

        loadAllProducts(filtered);
    }
}

function searchProducts() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const value = input.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    loadAllProducts(filtered);
}

function showProduct() {

    const box = document.getElementById("productDetails");

    if (!box) return;

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const product = products.find(item => item.id === id);

    if (!product) {
        box.innerHTML = "<h2>Product not found.</h2>";
        return;
    }

    box.innerHTML = `

        <div class="product-detail">

            <img src="${product.image}" alt="${product.name}">

            <div>

                <p class="small-title">
                    ${product.category}
                </p>

                <h1>${product.name}</h1>

                <div class="price">
                    ₹${product.price.toLocaleString()}
                </div>

                <p class="product-description">
                    ${product.description}
                </p>

                <button
                    class="primary-btn"
                    onclick="addToCart(${product.id})">
                    Add to cart
                </button>

            </div>

        </div>
    `;
}

function addToCart(id) {

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: id,
            quantity: 1
        });
    }

    saveCart();

    alert("Product added to cart");
}

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();
    loadCart();
}

function changeQuantity(id, amount) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    saveCart();
    loadCart();
}

function loadCart() {

    const box = document.getElementById("cartItems");

    if (!box) return;

    if (cart.length === 0) {

        box.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty.</h2>
                <p>Looks like you haven't added anything yet.</p>
                <br>
                <a href="shop.html" class="primary-btn">
                    Start Shopping
                </a>
            </div>
        `;

        return;
    }

    let total = 0;

    let html = "";

    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;

        const itemTotal = product.price * item.quantity;

        total += itemTotal;

        html += `
            <div class="cart-row">

                <img src="${product.image}">

                <div class="cart-row-info">
                    <small>${product.category}</small>
                    <h3>${product.name}</h3>

                    <p>
                        ₹${product.price.toLocaleString()}
                    </p>

                    <div>
                        <button
                            onclick="changeQuantity(${product.id}, -1)">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            onclick="changeQuantity(${product.id}, 1)">
                            +
                        </button>
                    </div>
                </div>

                <strong>
                    ₹${itemTotal.toLocaleString()}
                </strong>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${product.id})">
                    Remove
                </button>

            </div>
        `;
    });

    html += `
        <div class="cart-summary">

            <div>
                <small>Total</small>
                <h2>₹${total.toLocaleString()}</h2>
            </div>

            <button
                class="primary-btn"
                onclick="checkout()">
                Checkout →
            </button>

        </div>
    `;

    box.innerHTML = html;
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    window.location.href = "login.html";
}

function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value;

    localStorage.setItem("nexoraUser", email);

    alert("Login successful");

    window.location.href = "index.html";
}

function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;

    localStorage.setItem("nexoraUser", JSON.stringify({
        name,
        email
    }));

    alert("Account created successfully");

    window.location.href = "index.html";
}

function subscribeUser(event) {

    event.preventDefault();

    alert("Thanks for subscribing!");
}

function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}

loadFeaturedProducts();
loadAllProducts();
showProduct();
loadCart();
updateCartCount();