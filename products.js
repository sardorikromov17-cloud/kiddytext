// Manga mahsulotlari ro'yxati
const MANGA_PRODUCTS = [
    {
        id: 1,
        title: "One Piece",
        author: "Eiichiro Oda",
        category: ["shonen", "action", "adventure"],
        price: 45000,
        rating: 4.9,
        description: "Dengiz qaroqchilari haqida epik sarguzasht. Luffy va uning do'stlari Grand Line bo'ylab sayohat.",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
        inStock: true,
        volumes: 100
    },
    {
        id: 2,
        title: "Attack on Titan",
        author: "Hajime Isayama",
        category: ["seinen", "action", "fantasy"],
        price: 38000,
        rating: 4.8,
        description: "Titanlar insoniyatni yo'q qilish xavfi ostida. Eren va uning do'stlari insoniyatni himoya qilishadi.",
        image: "https://images.unsplash.com/photo-1618331833071-1c0c6ee3d19e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
        inStock: true,
        volumes: 34
    },
    {
        id: 3,
        title: "Naruto",
        author: "Masashi Kishimoto",
        category: ["shonen", "action"],
        price: 42000,
        rating: 4.7,
        description: "Yosh ninja Naruto Uzumakining Hokage bo'lish orzusi va sarguzashtlari.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
        inStock: true,
        volumes: 72
    },
    {
        id: 4,
        title: "Death Note",
        author: "Tsugumi Ohba",
        category: ["seinen", "mystery"],
        price: 32000,
        rating: 4.9,
        description: "O'lim daftarini topgan yigit Light Yagami dunyoni jinoyatchilardan tozalashga qaror qiladi.",
        image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
        inStock: true,
        volumes: 12
    },
    {
        id: 5,
        title: "Demon Slayer",
        author: "Koyoharu Gotouge",
        category: ["shonen", "action", "fantasy"],
        price: 40000,
        rating: 4.8,
        description: "Tanjironing oilasi demonlar tomonidan o'ldirilgach, u demon o'ldiruvchilarga qo'shiladi.",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=60",
        inStock: true,
        volumes: 23
    },
    {
        id: 6,
        title: "My Hero Academia",
        author: "Kohei Horikoshi",
        category: ["shonen", "action"],
        price: 37000,
        rating: 4.6,
        description: "Quvvatga ega bo'lmagan bola Izuku Midoriya dunyoning eng buyuk qahramoni bo'lishni orzu qiladi.",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=40",
        inStock: true,
        volumes: 35
    },
    {
        id: 7,
        title: "Tokyo Ghoul",
        author: "Sui Ishida",
        category: ["seinen", "horror"],
        price: 35000,
        rating: 4.5,
        description: "Talaba Ken Kaneki ghoulga aylanadi va insonlar va ghoular o'rtasidagi hayotni o'rganadi.",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=50",
        inStock: true,
        volumes: 14
    },
    {
        id: 8,
        title: "Fullmetal Alchemist",
        author: "Hiromu Arakawa",
        category: ["shonen", "fantasy"],
        price: 41000,
        rating: 4.9,
        description: "Edward va Alphonse Elric onalarini tiriltirish uchun kimyoviy o'zgartirish amalga oshirishadi.",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=30",
        inStock: true,
        volumes: 27
    },
    {
        id: 9,
        title: "Sailor Moon",
        author: "Naoko Takeuchi",
        category: ["shojo", "fantasy"],
        price: 36000,
        rating: 4.7,
        description: "O'rta maktab o'quvchisi Usagi Tsukino sayyoralar jangchisiga aylanadi va yovuz kuchlarga qarshi kurashadi.",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=20",
        inStock: true,
        volumes: 18
    },
    {
        id: 10,
        title: "Dragon Ball",
        author: "Akira Toriyama",
        category: ["shonen", "action"],
        price: 43000,
        rating: 4.8,
        description: "Goku kuchli jangchi bo'lib, Yerdan tashqari sayyoralarda turli janglar olib boradi.",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=10",
        inStock: true,
        volumes: 42
    }
];

// Kategoriyalar ro'yxati
const CATEGORIES = [
    { id: "all", name: "Hammasi" },
    { id: "shonen", name: "Shonen" },
    { id: "shojo", name: "Shojo" },
    { id: "seinen", name: "Seinen" },
    { id: "action", name: "Jangari" },
    { id: "fantasy", name: "Fantastika" },
    { id: "adventure", name: "Sarguzasht" },
    { id: "mystery", name: "Sirli" },
    { id: "horror", name: "Qo'rqinchli" }
];

// Mahsulotlarni filtrlash funksiyasi
function filterProducts(category, searchTerm = "") {
    let filtered = MANGA_PRODUCTS;
    
    if (category !== "all") {
        filtered = filtered.filter(product => 
            product.category.includes(category)
        );
    }
    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(term) ||
            product.author.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );
    }
    
    return filtered;
}