# Manga Telegram Web App

Zamonaviy dizayndagi manga (komikslar) savdosi uchun Telegram web ilova.

## O'rnatish qadamlari

### 1. Fayllarni yuklab olish
Yuqoridagi barcha fayllarni (index.html, style.css, script.js, config.js, products.js) bir papkaga saqlang.

### 2. Telegram Bot yaratish
1. Telegramda @BotFather ni qidiring
2. `/newbot` buyrug'ini yuboring
3. Bot uchun nom va username tanlang
4. Bot tokenini saqlab qo'ying

### 3. Web App ni sozlash
1. @BotFather ga borib
2. `/mybots` buyrug'ini tanlang
3. Yaratgan botingizni tanlang
4. "Bot Settings" > "Menu Button" > "Configure Menu Button"
5. "Configure Web App" tugmasini bosing
6. Web App nomi va URL manzilini kiriting

### 4. Hosting (Onlayn joylashtirish)
Fayllarni internetga joylashtirish uchun quyidagi bepul hostinglardan birini tanlang:

#### Variant A: GitHub Pages (Eng oson)
1. GitHub da yangi repository yarating
2. Barcha fayllarni yuklang
3. Settings > Pages > Source > main branch ni tanlang
4. URL manzilini oling (masalan: `https://foydalanuvchi.github.io/manga-telegram-app`)

#### Variant B: Netlify
1. Netlify.com saytiga o'ting
2. "Drag and drop" orqali fayllarni yuklang
3. URL manzilini oling

### 5. Bot tokenini sozlash
`config.js` faylida `BOT_TOKEN` va `ADMIN_ID` qiymatlarini o'zgartiring:

```javascript
BOT_TOKEN: "1234567890:AAHdLx...", // BotFather bergan token
ADMIN_ID: "123456789", // Sizning Telegram ID raqamingiz