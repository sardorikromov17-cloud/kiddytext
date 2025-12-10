// Telegram Web App sozlamalari
const tg = window.Telegram.WebApp;

// App konfiguratsiyasi
const CONFIG = {
    APP_NAME: "MangaDo'kon",
    CURRENCY: "so'm",
    DELIVERY_PRICE: 15000,
    TAX_RATE: 0.12, // 12% QQIS
    ADMIN_ID: "", // 6851586443
    BOT_TOKEN: "", // 8346506362:AAFk-yPBURy8eTpSGP-gklaWsLwQTqqgDy4
    
    // API endpoints (keyinchalik backend qo'shilsa)
    API_BASE_URL: "",
    
    // Mahsulotlar rasmlari
    IMAGE_BASE_URL: "https://via.placeholder.com/300x200/7c3aed/ffffff?text=Manga",
    
    // Telegram funksiyalari
    initTelegram: function() {
        tg.expand();
        tg.MainButton.hide();
        tg.BackButton.hide();
        
        // Foydalanuvchi ma'lumotlarini olish
        const user = tg.initDataUnsafe.user;
        if (user) {
            console.log("Foydalanuvchi:", user);
            // Ism va telefon raqamini avtomatik to'ldirish
            const nameField = document.getElementById('name');
            if (nameField && user.first_name) {
                nameField.value = `${user.first_name} ${user.last_name || ''}`.trim();
            }
        }
    }
};

// Telegram orqali xabar yuborish
function sendToTelegram(message) {
    // Bu funksiya backend bilan ishlaganda to'liq amalga oshadi
    console.log("Telegramga yuborildi:", message);
    showNotification("Buyurtma qabul qilindi! Tez orada operator aloqaga chiqadi.", "success");
}

// Xabar ko'rsatish
function showNotification(message, type = "success") {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Yuklash animatsiyasi
function showLoader() {
    document.getElementById('loader').classList.add('active');
}

function hideLoader() {
    document.getElementById('loader').classList.remove('active');
}

// Mahsulot formati
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + CONFIG.CURRENCY;
}

// Savatni localStorage ga saqlash
function saveCartToStorage(cart) {
    localStorage.setItem('manga_cart', JSON.stringify(cart));
}

// Savatni localStorage dan o'qish
function loadCartFromStorage() {
    const cart = localStorage.getItem('manga_cart');
    return cart ? JSON.parse(cart) : [];
}

// Telegram orqali xabar yuborish (backend bilan ishlash uchun)
async function sendOrderToAdmin(orderData) {
    showLoader();
    
    try {
        // Bu yerda backend API ga so'rov yuboriladi
        // Hozircha simulyatsiya qilamiz
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Admin ga Telegram orqali xabar yuborish
        const message = `🛒 YANGI BUYURTMA!\n\nIsm: ${orderData.name}\nTelefon: ${orderData.phone}\nManzil: ${orderData.address}\nTo'lov: ${orderData.payment}\nJami: ${formatPrice(orderData.total)}`;
        
        // Agar admin ID berilgan bo'lsa, Telegram orqali xabar yuborish
        if (CONFIG.ADMIN_ID && CONFIG.BOT_TOKEN) {
            // Telegram API orqali xabar yuborish
            // Amalda bu backend orqali amalga oshiriladi
        }
        
        sendToTelegram(message);
        
        // Savatni tozalash
        localStorage.removeItem('manga_cart');
        
        showNotification("Buyurtma muvaffaqiyatli qabul qilindi! Tez orada operator aloqaga chiqadi.", "success");
        
        return true;
    } catch (error) {
        console.error("Xatolik:", error);
        showNotification("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.", "error");
        return false;
    } finally {
        hideLoader();
    }
}