
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const body = await request.json();
        const category = await prisma.menuCategory.update({
            where: { id: params.id },
            data: {
                name: body.name,
                color: body.color || 'default',
                layoutType: body.layoutType,
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;

        // Check if category has any menus
        const menuCount = await prisma.menu.count({
            where: { categoryId: params.id }
        });

        if (menuCount > 0) {
            return NextResponse.json(
                { error: `Không thể xóa danh mục này vì còn ${menuCount} món ăn bên trong. Vui lòng xóa món ăn trước.` },
                { status: 400 }
            );
        }

        // Then delete the category
        await prisma.menuCategory.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete category error:", error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
