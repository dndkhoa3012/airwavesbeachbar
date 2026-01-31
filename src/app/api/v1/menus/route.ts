import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const menus = await prisma.menu.findMany({
            include: {
                category: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Transform data to match frontend expectation if needed, 
        // but current schema mostly matches.
        // Flatten category name for table display if necessary, 
        // but frontend probably handles access via menu.category.name 
        // OR we map it here.
        // Looking at page.tsx: record.category (string name) vs record.category (object).
        // The current frontend expects 'category' to be a string name in some places
        // and checks `categories` array for color.

        const formattedMenus = menus.map(menu => ({
            ...menu,
            category: menu.category.name, // Flatten for current table compatibility
            categoryId: menu.categoryId,
            desc: menu.description // Frontend compatible field
        }));

        return NextResponse.json(formattedMenus);
    } catch (error) {
        console.error("GET menus error:", error);
        return NextResponse.json({ error: 'Failed to fetch menus' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Find category by name first since frontend sends name
        // Helper to find or create category
        // TODO: Ideally user should select existing category ID. For Excel import, we might need auto-create.
        // For now, assume simple matching if ID not provided (though in current UI we send categoryId usually)
        let setCategoryId = body.categoryId;

        if (!setCategoryId && body.categoryName) {
            const category = await prisma.menuCategory.findFirst({
                where: { name: body.categoryName }
            });
            if (category) {
                setCategoryId = category.id;
            } else {
                const newCat = await prisma.menuCategory.create({
                    data: { name: body.categoryName }
                });
                setCategoryId = newCat.id;
            }
        }

        const newMenu = await prisma.menu.create({
            data: {
                name: body.name,
                price: body.price, // Store as string
                description: body.description,
                image: body.image,
                categoryId: setCategoryId,
            },
            include: {
                category: true
            }
        });

        return NextResponse.json({
            ...newMenu,
            category: newMenu.category.name,
            desc: newMenu.description
        });
    } catch (error) {
        console.error("POST menu error:", error);
        return NextResponse.json({ error: 'Failed to create menu' }, { status: 500 });
    }
}
