import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const { id } = params;
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Format data
        const formattedEvent = {
            id: event.id,
            title: event.name,
            image: event.poster,
            category: event.category?.name || 'Uncategorized',
            categoryId: event.categoryId,
            date: event.date.toISOString().split('T')[0], // YYYY-MM-DD
            time: `${event.startTime || '00:00'} - ${event.endTime || '00:00'}`,
            location: event.location,
            price: event.price,
            description: event.description,
            content: (event as any).content,
            startTime: event.startTime,
            endTime: event.endTime,
            itinerary: event.itinerary,
            timeline: event.timeline,
            isFeatured: (event as any).isFeatured ?? false,
            isHidden: (event as any).isHidden ?? false,
        };

        return NextResponse.json(formattedEvent);
    } catch (error) {
        console.error("GET event error:", error);
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const body = await request.json();
        const { id } = params;

        let categoryId = body.categoryId;

        // Find or create category if needed
        // Handle empty string for categoryId
        if (categoryId === "" || categoryId === "undefined") {
            categoryId = null;
        }

        if (!categoryId && body.category) {
            const cat = await prisma.eventCategory.findFirst({
                where: { name: body.category }
            });
            if (cat) categoryId = cat.id;
        }

        // Validate date
        if (!body.date) {
            return NextResponse.json({ error: 'Date is required' }, { status: 400 });
        }

        const eventDate = new Date(body.date);
        if (isNaN(eventDate.getTime())) {
            return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
        }

        // Validate category existence if provided
        if (categoryId) {
            const categoryExists = await prisma.eventCategory.findUnique({
                where: { id: categoryId }
            });
            if (!categoryExists) {
                return NextResponse.json({ error: 'Invalid Category ID: Category not found' }, { status: 400 });
            }
        }

        // If setting isFeatured to true, turn off all other featured events first
        if (body.isFeatured === true) {
            await prisma.event.updateMany({
                where: {
                    id: { not: id },
                    isFeatured: true
                },
                data: { isFeatured: false }
            });
        }

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                name: body.title,
                date: eventDate,
                poster: body.image,
                description: body.description,
                content: body.content,
                location: body.location,
                price: typeof body.price === 'number' ? body.price : (parseInt(body.price) || 0),
                startTime: body.startTime,
                endTime: body.endTime,
                isFeatured: body.isFeatured ?? false,
                isHidden: body.isHidden ?? false,
                // Use connect syntax for relation
                category: categoryId ? {
                    connect: { id: categoryId }
                } : {
                    disconnect: true
                },
                // @ts-ignore
                itinerary: body.itinerary || [],
                // @ts-ignore
                timeline: body.timeline || []
            } as any,
            include: {
                category: true
            }
        });

        return NextResponse.json(updatedEvent);
    } catch (error: any) {
        console.error("PUT event error:", error);
        // Serialize error safely
        const errorMessage = error?.message || String(error);
        const errorStack = error?.stack || null;
        return NextResponse.json({
            error: 'Failed to update event',
            details: errorMessage,
            stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
        }, { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const { id } = params;
        await prisma.event.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE event error:", error);
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}
