// DOM elementlari
let cart = loadCartFromStorage();
let currentCategory = "all";
let currentSearch = "";

// DOM elementlarini tanlash
const productsContainer = document.getElementById('products-container');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const orderModal = document.getElementById('order-modal');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartCountElement = document.getElementById('cart-count');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const orderForm = document.getElementById('order-form');
const themeToggle = document.getElementById('theme-toggle');

// Telegram Web App ni ishga tushirish
document.addEventListener('DOMContentLoaded', function() {
    // Telegram Web App ni ishga tushirish
    if (window.Telegram && window.Telegram.WebApp) {
        CONFIG.initTelegram();
    }
    
    // Dastlabki yuklash
    initApp();
});

// Ilovani ishga tushirish
function initApp() {
    // Mahsulotlarni ko'rsatish
    displayProducts(MANGA_PRODUCTS);
    
    // Savatni yangilash
    updateCart();
    
    // Hodisalar (events) ni bog'lash
    setupEventListeners();
    
    // Mavzuni o'rnatish
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// Hodisalarni bog'lash
function setupEventListeners() {
    // Savat tugmasi
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        renderCartItems();
    });
    
    // Modalni yopish
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            cartModal.classList.remove('active');
            orderModal.classList.remove('active');
        });
    });
    
    // Modal tashqarisini bosganda yopish
    [cartModal, orderModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Kategoriya tugmalari
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Faol kategoriyani o'zgartirish
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Mahsulotlarni filtrlash
            currentCategory = btn.dataset.category;
            const filtered = filterProducts(currentCategory, currentSearch);
            displayProducts(filtered);
        });
    });
    
    // Qidiruv
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    // Savatni tozalash
    clearCartBtn.addEventListener('click', clearCart);
    
    // Buyurtma berish
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification("Savat bo'sh. Iltimos, avval mahsulot qo'shing.", "error");
            return;
        }
        cartModal.classList.remove('active');
        orderModal.classList.add('active');
    });
    
    // Buyurtma formasi
    orderForm.addEventListener('submit', handleOrderSubmit);
    
    // Mavzuni o'zgartirish
    themeToggle.addEventListener('click', toggleTheme);
}

// Mahsulotlarni ekranga chiqarish
function displayProducts(products) {
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; color: var(--primary-color);"></i>
                <h3>Mahsulot topilmadi</h3>
                <p>Boshqa kategoriya yoki qidiruv so'zini sinab ko'ring.</p>
            </div>
        `;
        return;
    }
    
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-meta">
                    <span class="product-author">${product.author}</span>
                    <span class="product-rating">⭐ ${product.rating}</span>
                </div>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Savatga qo'shish
                </button>
            </div>
        </div>
    `).join('');
    
    // Savatga qo'shish tugmalari
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            addToCart(productId);
            
            // Tugma holatini o'zgartirish
            e.currentTarget.innerHTML = '<i class="fas fa-check"></i> Qo\'shildi';
            e.currentTarget.classList.add('added');
            setTimeout(() => {
                e.currentTarget.innerHTML = '<i class="fas fa-cart-plus"></i> Savatga qo\'shish';
                e.currentTarget.classList.remove('added');
            }, 1500);
        });
    });
}

// Savatga mahsulot qo'shish
function addToCart(productId) {
    const product = MANGA_PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    // Mahsulot savatda bormi?
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Savatni yangilash
    updateCart();
    showNotification(`"${product.title}" savatga qo'shildi!`);
}

// Savatni yangilash
function updateCart() {
    // Savatni saqlash
    saveCartToStorage(cart);
    
    // Savatdagi mahsulotlar soni
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Jami narx
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = formatPrice(totalPrice);
}

// Savat elementlarini ko'rsatish
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 20px; color: var(--primary-color);"></i>
                <h3>Savat bo'sh</h3>
                <p>Mahsulot qo'shish uchun "Savatga qo'shish" tugmasini bosing.</p>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn decrease">-</button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="quantity-btn increase">+</button>
                <button class="remove-item"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    
    // Miqdor tugmalari
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            
            if (e.target.classList.contains('increase')) {
                changeQuantity(itemId, 1);
            } else if (e.target.classList.contains('decrease')) {
                changeQuantity(itemId, -1);
            }
        });
    });
    
    // O'chirish tugmalari
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            removeFromCart(itemId);
        });
    });
}

// Miqdorni o'zgartirish
function changeQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    // Agar miqdor 0 bo'lsa, o'chirish
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    // Savatni yangilash
    updateCart();
    renderCartItems();
}

// Savatdan o'chirish
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    renderCartItems();
    showNotification("Mahsulot savatdan o'chirildi.");
}

// Savatni tozalash
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm("Savatni tozalashni istaysizmi?")) {
        cart = [];
        updateCart();
        renderCartItems();
        showNotification("Savat tozalandi.");
    }
}

// Qidiruvni amalga oshirish
function performSearch() {
    currentSearch = searchInput.value.trim();
    const filtered = filterProducts(currentCategory, currentSearch);
    displayProducts(filtered);
}

// Buyurtma formasi
async function handleOrderSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        payment: document.getElementById('payment').value,
        cart: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), CONFIG.DELIVERY_PRICE)
    };
    
    // Formani tekshirish
    if (!formData.name || !formData.phone || !formData.address) {
        showNotification("Iltimos, barcha maydonlarni to'ldiring.", "error");
        return;
    }
    
    // Buyurtmani yuborish
    const success = await sendOrderToAdmin(formData);
    
    if (success) {
        // Modalni yopish va savatni tozalash
        orderModal.classList.remove('active');
        cart = [];
        updateCart();
        
        // Formani tozalash
        orderForm.reset();
    }
}

// Mavzuni o'zgartirish
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Mavzuni o'rnatish
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Tugma ikonkasini o'zgartirish
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}