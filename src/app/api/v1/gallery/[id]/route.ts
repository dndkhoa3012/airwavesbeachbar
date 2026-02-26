import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        await prisma.galleryImage.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE gallery error:", error);
        return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const body = await request.json();

        const image = await prisma.galleryImage.update({
            where: {
                id: params.id,
            },
            data: {
                src: body.src,
                alt: body.alt,
                categoryId: body.categoryId,
            },
        });

        return NextResponse.json(image);
    } catch (error) {
        console.error("PUT gallery error:", error);
        return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 });
    }
}
