
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

const initialCategories = [
    { name: "Signature Cocktails", color: "purple" },
    { name: "Bia & Rượu", color: "blue" },
    { name: "Món Khai Vị", color: "orange" },
    { name: "Món Chính", color: "volcano" },
    { name: "Tráng Miệng", color: "cyan" },
];

const initialMenus = [
    // --- Signature Cocktails ---
    {
        name: "Old Fashioned",
        price: "180k",
        description: "Bourbon, Angostura Bitters, Sugar Cube. A timeless classic.",
        image: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
        categoryName: "Signature Cocktails"
    },
    {
        name: "Classic Gin Tonic",
        price: "150k",
        description: "Premium Gin, Tonic water, Lime slice, Juniper berries.",
        image: "https://www.thecocktaildb.com/images/media/drink/z0omyp1582480573.jpg",
        categoryName: "Signature Cocktails"
    },
    {
        name: "Tropical Mojito",
        price: "160k",
        description: "White Rum, Fresh Mint, Lime Juice, Brown Sugar, Soda.",
        image: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
        categoryName: "Signature Cocktails"
    },
    {
        name: "Pina Colada",
        price: "170k",
        description: "Rum, Coconut Cream, Pineapple Juice. The taste of paradise.",
        image: "https://www.thecocktaildb.com/images/media/drink/cpf4j51504371346.jpg",
        categoryName: "Signature Cocktails"
    },
    {
        name: "Margarita",
        price: "160k",
        description: "Tequila, Cointreau, Lime Juice, Salt Rim.",
        image: "https://www.thecocktaildb.com/images/media/drink/5n43i51504372495.jpg",
        categoryName: "Signature Cocktails"
    },

    // --- Bia & Rượu ---
    {
        name: "Bia Sài Gòn Special",
        price: "40k",
        description: "Chai 330ml. Vị bia đậm đà truyền thống.",
        image: null,
        categoryName: "Bia & Rượu"
    },
    {
        name: "Bia Tiger Crystal",
        price: "45k",
        description: "Chai 330ml. Sảng khoái và êm đằm.",
        image: null,
        categoryName: "Bia & Rượu"
    },
    {
        name: "Heineken",
        price: "50k",
        description: "Chai 330ml. Hương vị thượng hạng.",
        image: null,
        categoryName: "Bia & Rượu"
    },
    {
        name: "Corona Extra",
        price: "60k",
        description: "Chai 355ml. Thưởng thức cùng lát chanh tươi.",
        image: null,
        categoryName: "Bia & Rượu"
    },
    {
        name: "Rượu Vang Đỏ (Ly)",
        price: "120k",
        description: "House Wine - Cabernet Sauvignon.",
        image: null,
        categoryName: "Bia & Rượu"
    },
    {
        name: "Coca Cola",
        price: "30k",
        description: "Lon 330ml, kèm ly đá.",
        image: null,
        categoryName: "Bia & Rượu"
    },
    {
        name: "Dừa Tươi",
        price: "50k",
        description: "Dừa xiêm ướp lạnh nguyên trái.",
        image: null,
        categoryName: "Bia & Rượu"
    },

    // --- Món Khai Vị ---
    {
        name: "Khoai tây chiên",
        price: "80k",
        description: "Khoai tây chiên giòn, rắc muối, chấm tương ớt hoặc mayonnaise.",
        image: null,
        categoryName: "Món Khai Vị"
    },
    {
        name: "Chả Giò Hải Sản",
        price: "95k",
        description: "Chả giò chiên giòn nhân tôm thịt, ăn kèm rau sống và nước mắm chua ngọt.",
        image: null,
        categoryName: "Món Khai Vị"
    },
    {
        name: "Mực Chiên Giòn",
        price: "120k",
        description: "Mực vòng tẩm bột chiên giòn (Calamari), chấm sốt Tartar.",
        image: null,
        categoryName: "Món Khai Vị"
    },
    {
        name: "Cánh Gà Chiên Nước Mắm",
        price: "110k",
        description: "Cánh gà chiên giòn đậm đà hương vị nước mắm tỏi ớt.",
        image: null,
        categoryName: "Món Khai Vị"
    },
    {
        name: "Gỏi Xoài Tôm Khô",
        price: "90k",
        description: "Gỏi xoài xanh chua cay trộn tôm khô, đậu phộng và rau răm.",
        image: null,
        categoryName: "Món Khai Vị"
    },
    {
        name: "Bánh Mì Bơ Tỏi",
        price: "60k",
        description: "Bánh mì nướng giòn thơm lừng bơ tỏi.",
        image: null,
        categoryName: "Món Khai Vị"
    },

    // --- Món Chính ---
    {
        name: "Signature Beef Burger",
        price: "190k",
        description: "Bò Úc nướng, phô mai Cheddar, thịt xông khói, trứng ốp la, ăn kèm khoai tây chiên.",
        image: null,
        categoryName: "Món Chính"
    },
    {
        name: "Mỳ Ý Carbonara",
        price: "160k",
        description: "Mỳ Ý sốt kem trứng, thịt xông khói và phô mai Parmesan.",
        image: null,
        categoryName: "Món Chính"
    },
    {
        name: "Pizza Margherita",
        price: "150k",
        description: "Pizza đế mỏng, sốt cà chua, phô mai Mozzarella và lá húng quế.",
        image: null,
        categoryName: "Món Chính"
    },
    {
        name: "Cơm Chiên Hải Sản",
        price: "140k",
        description: "Cơm chiên tôm, mực, trứng và rau củ.",
        image: null,
        categoryName: "Món Chính"
    },
    {
        name: "Bò Bít Tết (Ribeye Steak)",
        price: "350k",
        description: "Thăn lưng bò nướng (200g), sốt tiêu đen, ăn kèm khoai tây và salad.",
        image: null,
        categoryName: "Món Chính"
    },
    {
        name: "Club Sandwich",
        price: "130k",
        description: "Bánh mì sandwich kẹp 3 tầng: gà nướng, trứng, thịt xông khói, rau xà lách.",
        image: null,
        categoryName: "Món Chính"
    },

    // --- Tráng Miệng ---
    {
        name: "Đĩa Trái Cây Nhiệt Đới",
        price: "100k",
        description: "Các loại trái cây tươi theo mùa (Dưa hấu, Thơm, Xoài, Thanh long...).",
        image: null,
        categoryName: "Tráng Miệng"
    },
    {
        name: "Kem Dừa",
        price: "60k",
        description: "Kem dừa mát lạnh, rắc đậu phộng và dừa khô.",
        image: null,
        categoryName: "Tráng Miệng"
    },
    {
        name: "Bánh Chocolate",
        price: "75k",
        description: "Bánh bông lan chocolate đậm đà, ăn kèm sốt socola.",
        image: null,
        categoryName: "Tráng Miệng"
    }
];

async function main() {
    console.log(`Start seeding ...`)

    // Seed Categories
    for (const cat of initialCategories) {
        const existingCat = await prisma.menuCategory.findFirst({ where: { name: cat.name } });
        if (!existingCat) {
            const createdCat = await prisma.menuCategory.create({
                data: cat
            });
            console.log(`Created category with id: ${createdCat.id}`)
        } else {
            console.log(`Category ${cat.name} already exists`)
        }
    }

    // Seed Event Categories
    const initialEventCategories = [
        { name: "Live Music", color: "purple" },
        { name: "Beach Party", color: "orange" },
        { name: "Private Event", color: "blue" },
        { name: "Special Holiday", color: "red" },
    ];

    for (const cat of initialEventCategories) {
        const existingCat = await prisma.eventCategory.findFirst({ where: { name: cat.name } });
        if (!existingCat) {
            const createdCat = await prisma.eventCategory.create({
                data: cat
            });
            console.log(`Created event category: ${createdCat.name}`)
        } else {
            console.log(`Event Category ${cat.name} already exists`)
        }
    }

    // Seed Menu Items
    for (const menu of initialMenus) {
        const category = await prisma.menuCategory.findFirst({ where: { name: menu.categoryName } });
        if (category) {
            const existingMenu = await prisma.menu.findFirst({ where: { name: menu.name } });
            if (!existingMenu) {
                const createdMenu = await prisma.menu.create({
                    data: {
                        name: menu.name,
                        price: menu.price,
                        description: menu.description,
                        image: menu.image,
                        categoryId: category.id
                    }
                });
                console.log(`Created menu item: ${createdMenu.name}`);
            } else {
                console.log(`Menu ${menu.name} already exists`);
            }
        } else {
            console.warn(`Category ${menu.categoryName} not found for menu ${menu.name}`);
        }
    }

    console.log(`Seeding finished.`)

    // Seed Events
    const initialEvents = [
        {
            name: "Sunset Acoustic Night",
            date: new Date('2025-02-15T18:00:00'),
            poster: "https://images.unsplash.com/photo-1506157786151-b8491531f436?w=800&q=80",
            description: "Thưởng thức nhạc Acoustic nhẹ nhàng trong khung cảnh hoàng hôn lãng mạn trên biển.",
            categoryName: "Live Music",
            location: "Sân Khấu",
            price: "Miễn phí",
            startTime: "18:00",
            endTime: "21:00"
        },
        {
            name: "Weekend Beach Party",
            date: new Date('2025-02-20T19:00:00'),
            poster: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800&q=80",
            description: "Sôi động cùng DJ hàng đầu và những ly cocktail tuyệt hảo.",
            categoryName: "Beach Party",
            location: "Bãi Biển",
            price: "150.000đ",
            startTime: "19:30",
            endTime: "23:00"
        },
        {
            name: "Wedding Anniversary: John & Sarah",
            date: new Date('2025-03-10T17:00:00'),
            poster: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
            description: "Tiệc kỷ niệm ngày cưới riêng tư bên bờ biển.",
            categoryName: "Private Event",
            location: "Pool Bar",
            price: "Liên hệ",
            startTime: "17:00",
            endTime: "22:00"
        },
        {
            name: "New Year Eve Countdown",
            date: new Date('2025-12-31T20:00:00'),
            poster: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80",
            description: "Đếm ngược đón năm mới với màn pháo hoa rực rỡ.",
            categoryName: "Special Holiday",
            location: "Bãi Biển Chính",
            price: "299.000đ",
            startTime: "20:00",
            endTime: "02:00"
        }
    ];

    for (const event of initialEvents) {
        const category = await prisma.eventCategory.findFirst({ where: { name: event.categoryName } });
        if (category) {
            const existingEvent = await prisma.event.findFirst({ where: { name: event.name } });
            if (!existingEvent) {
                const createdEvent = await prisma.event.create({
                    data: {
                        name: event.name,
                        date: event.date,
                        poster: event.poster,
                        description: event.description,
                        categoryId: category.id,
                        location: event.location,
                        price: event.price,
                        startTime: event.startTime,
                        endTime: event.endTime
                    }
                });
                console.log(`Created event: ${createdEvent.name}`);
            } else {
                console.log(`Event ${event.name} already exists`);
            }
        } else {
            console.warn(`Category ${event.categoryName} not found for event ${event.name}`);
        }
    }

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
