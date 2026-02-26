
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const demoImages = [
    {
        src: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2588&auto=format&fit=crop",
        alt: "Atmosphere"
    },
    {
        src: "https://images.unsplash.com/photo-1519046904884-53103b34b271?q=80&w=2588&auto=format&fit=crop",
        alt: "Beach Vibes"
    },
    {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2592&auto=format&fit=crop",
        alt: "Sunny Day"
    },
    {
        src: "https://images.unsplash.com/photo-1520483602335-99a68872c32e?q=80&w=2532&auto=format&fit=crop",
        alt: "Party"
    },
    {
        src: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=2072&auto=format&fit=crop",
        alt: "Relax"
    },
    {
        src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2574&auto=format&fit=crop",
        alt: "Drinks"
    }
];

async function main() {
    console.log("Seeding gallery images...");

    // Clear existing images to avoid duplicates if re-running (optional, but good for demo)
    // await prisma.galleryImage.deleteMany({}); 

    for (const img of demoImages) {
        await prisma.galleryImage.create({
            data: {
                src: img.src,
                alt: img.alt
            }
        });
    }
    console.log("Seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
