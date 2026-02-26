import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const images = await prisma.galleryImage.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                collection: {
                    include: {
                        category: true
                    }
                }
            },
        });
        return NextResponse.json(images);
    } catch (error) {
        console.error("GET gallery error:", error);
        return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.src) {
            return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
        }

        const image = await prisma.galleryImage.create({
            data: {
                src: body.src,
                alt: body.alt || '',
                collectionId: body.collectionId || null,
            },
        });

        return NextResponse.json(image);
    } catch (error) {
        console.error("POST gallery error:", error);
        return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 });
    }
}
