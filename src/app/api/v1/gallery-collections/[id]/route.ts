import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const collection = await prisma.galleryCollection.findUnique({
            where: { id: params.id },
            include: {
                category: true,
                images: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        });

        if (!collection) {
            return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
        }

        return NextResponse.json(collection);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const body = await request.json();
        const { name, categoryId, images, coverImage, description } = body;

        // Transaction for update + image sync
        const updatedCollection = await prisma.$transaction(async (tx) => {
            // 1. Update basic info
            const collection = await tx.galleryCollection.update({
                where: { id: params.id },
                data: {
                    name,
                    description,
                    categoryId,
                    // If coverImage is explicitly provided, use it.
                    // If not, and we have images, default to the first one (order of appearance in the array is implied as the "new" order)
                    coverImage: coverImage || (images && images.length > 0 ? images[0] : null)
                }
            });

            // 2. Sync Images if provided
            if (images && Array.isArray(images)) {
                // Determine implicit order from the array index
                const inboundImages = images.map((src: string, index: number) => ({ src, order: index }));
                const inboundUrls = new Set(images);

                // Get existing images
                const existingImages = await tx.galleryImage.findMany({
                    where: { collectionId: params.id }
                });

                // A. Delete removed images
                const toDelete = existingImages
                    .filter(img => !inboundUrls.has(img.src))
                    .map(img => img.id);

                if (toDelete.length > 0) {
                    await tx.galleryImage.deleteMany({
                        where: { id: { in: toDelete } }
                    });
                }

                // B. Upsert (Update Order or Create New)
                // Since upsertMany isn't standard, we iterate or use separate ops. 
                // For optimal performance with small arrays (usually < 50 images), simple loop is fine.
                // However, we can optimize by splitting into "Update" and "Create".

                for (const item of inboundImages) {
                    const existing = existingImages.find(img => img.src === item.src);
                    if (existing) {
                        // Update order if changed
                        if (existing.order !== item.order) {
                            await tx.galleryImage.update({
                                where: { id: existing.id },
                                data: { order: item.order }
                            });
                        }
                    } else {
                        // Create new
                        await tx.galleryImage.create({
                            data: {
                                src: item.src,
                                collectionId: params.id,
                                order: item.order
                            }
                        });
                    }
                }
            }

            return collection;
        });

        return NextResponse.json(updatedCollection);
    } catch (error) {
        console.error("PUT collection error:", error);
        return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await prisma.galleryCollection.delete({
            where: { id: params.id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
    }
}
