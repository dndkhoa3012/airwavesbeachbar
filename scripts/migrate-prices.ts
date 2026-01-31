
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting price migration...');

    const menus = await prisma.menu.findMany();
    let updatedCount = 0;

    for (const menu of menus) {
        if (menu.price && typeof menu.price === 'string' && menu.price.toLowerCase().includes('k')) {
            // Replace 'k' (case insensitive) with '000' and remove any other non-digit chars (except keeping the replacing logic simple first)
            // Strategy: Remove non-digits, then multiply? 
            // Or just replace 'k' with '000' and then clean?

            // Let's rely on the user's request: "change data saved with 'k' to '000'"
            // e.g. "180k" -> "180000"
            // "50K" -> "50000"

            const cleanPrice = menu.price.toLowerCase().replace(/k/g, '000').replace(/\D/g, '');

            console.log(`Migrating "${menu.name}": ${menu.price} -> ${cleanPrice}`);

            await prisma.menu.update({
                where: { id: menu.id },
                data: { price: cleanPrice },
            });
            updatedCount++;
        }
    }

    console.log(`Migration complete. Updated ${updatedCount} items.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
