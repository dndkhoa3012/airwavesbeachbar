import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const menu = await prisma.menu.findUnique({
            where: { id },
            include: { category: true }
        });

        if (!menu) {
            return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...menu,
            category: menu.category.name,
            categoryId: menu.categoryId,
            desc: menu.description
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Handle category update similarly to POST
        let categoryId = body.categoryId;
        const updateData: any = {
            name: body.name,
            price: body.price,
            description: body.desc !== undefined ? body.desc : body.description,
            image: body.image,
        };

        if (!categoryId && body.categoryName) {
            const category = await prisma.menuCategory.findFirst({
                where: { name: body.categoryName }
            });
            if (category) {
                updateData.categoryId = category.id;
            }
        } else if (categoryId) {
            updateData.categoryId = categoryId;
        }

        const menu = await prisma.menu.update({
            where: { id },
            data: updateData,
            include: { category: true }
        });

        return NextResponse.json({
            ...menu,
            category: menu.category.name,
            desc: menu.description
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update menu' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.menu.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete menu' }, { status: 500 });
    }
}
