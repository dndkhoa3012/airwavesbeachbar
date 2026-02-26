
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

async function main() {
    console.log('Starting data cleanup...');

    // 1. Fetch all GalleryImages
    const images = await prisma.galleryImage.findMany();
    console.log(`Found ${images.length} db images.`);

    // Normalize DB paths to absolute paths for comparison
    const dbImagePaths = new Set();
    images.forEach(img => {
        if (img.src && img.src.startsWith('/')) {
            // img.src e.g. /uploads/file.jpg -> /User/.../public/uploads/file.jpg
            const fullPath = path.join(process.cwd(), 'public', img.src);
            dbImagePaths.add(fullPath);
        }
    });

    const uniqueMap = new Map();
    const toDeleteIds = [];
    const missingFileIds = [];

    // Check DB duplicates and missing files
    for (const img of images) {
        const key = `${img.src}|${img.collectionId || 'null'}`;
        if (uniqueMap.has(key)) {
            console.log(`Duplicate DB entry: ${img.src} (ID: ${img.id})`);
            toDeleteIds.push(img.id);
        } else {
            if (img.src.startsWith('/')) {
                const filePath = path.join(process.cwd(), 'public', img.src);
                if (!fs.existsSync(filePath)) {
                    console.warn(`File missing for image: ${img.src}`);
                    missingFileIds.push(img.id);
                } else {
                    uniqueMap.set(key, img.id);
                }
            } else {
                uniqueMap.set(key, img.id);
            }
        }
    }

    // Delete bad DB records
    const totalDelete = [...toDeleteIds, ...missingFileIds];
    if (totalDelete.length > 0) {
        console.log(`Deleting ${totalDelete.length} bad DB records...`);
        await prisma.galleryImage.deleteMany({
            where: { id: { in: totalDelete } }
        });
    }

    // 2. Scan for orphaned files in public/uploads
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    if (fs.existsSync(uploadsDir)) {
        console.log('Scanning for orphaned files in public/uploads...');
        const allFiles = await getAllFiles(uploadsDir, []);
        let orphanedCount = 0;

        for (const file of allFiles) {
            // file is absolute path
            // Check if this file is in our dbImagePaths
            // Note: need to be careful with normalization (shortcuts, symlinks, etc)
            // But simple string compare should work if we construct consistently
            if (!dbImagePaths.has(file)) {
                console.log(`Orphaned file found: ${file}`);
                try {
                    fs.unlinkSync(file);
                    console.log('Deleted orphaned file.');
                    orphanedCount++;
                } catch (e) {
                    console.error('Failed to delete orphaned file:', e);
                }
            }
        }
        console.log(`Removed ${orphanedCount} orphaned files.`);
    } else {
        console.log('public/uploads does not exist, skipping file scan.');
    }

    console.log('Cleanup finished.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
