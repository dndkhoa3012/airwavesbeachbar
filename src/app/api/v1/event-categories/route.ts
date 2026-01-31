import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const categories = await prisma.eventCategory.findMany({
            include: {
                _count: {
                    select: { events: true }
                }
            }
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch event categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const category = await prisma.eventCategory.create({
            data: {
                name: body.name,
                color: body.color || 'default',
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create event category' }, { status: 500 });
    }
}
