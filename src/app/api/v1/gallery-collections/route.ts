import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const collections = await prisma.galleryCollection.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                category: true,
                images: {
                    take: 1, // Preview image if cover is missing
                },
                _count: {
                    select: { images: true }
                }
            },
        });
        return NextResponse.json(collections);
    } catch (error) {
        console.error("GET gallery-collections error:", error);
        return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, categoryId, images, coverImage, description } = body;

        if (!name || !categoryId) {
            return NextResponse.json({ error: 'Name and Category are required' }, { status: 400 });
        }

        // Transaction to ensure atomicity
        const collection = await prisma.$transaction(async (tx) => {
            // 1. Create Collection
            const newCollection = await tx.galleryCollection.create({
                data: {
                    name,
                    description,
                    categoryId,
                    coverImage: coverImage || (images && images.length > 0 ? images[0] : null)
                }
            });

            // 2. Create Images if provided
            if (images && images.length > 0) {
                await tx.galleryImage.createMany({
                    data: images.map((src: string) => ({
                        src,
                        collectionId: newCollection.id
                    }))
                });
            }

            return newCollection;
        });

        return NextResponse.json(collection);
    } catch (error) {
        console.error("POST gallery-collections error:", error);
        return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
    }
}
