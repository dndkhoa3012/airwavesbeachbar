
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const body = await request.json();
        const category = await prisma.eventCategory.update({
            where: { id: params.id },
            data: {
                name: body.name,
                color: body.color || 'default',
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update event category' }, { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;

        // Check if category has any events
        const eventCount = await prisma.event.count({
            where: { categoryId: params.id }
        });

        if (eventCount > 0) {
            return NextResponse.json(
                { error: `Không thể xóa danh mục này vì còn ${eventCount} sự kiện bên trong. Vui lòng xóa sự kiện trước.` },
                { status: 400 }
            );
        }

        // Then delete the category
        await prisma.eventCategory.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete event category error:", error);
        return NextResponse.json({ error: 'Failed to delete event category' }, { status: 500 });
    }
}
