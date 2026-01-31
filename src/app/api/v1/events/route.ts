import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            include: {
                category: true,
            },
            orderBy: {
                date: 'asc',
            },
        });

        // Format data to match frontend expectations
        const formattedEvents = events.map(event => {
            // Parse images from poster field (stored as JSON string array)
            let images: string[] = [];
            try {
                if (event.poster) {
                    const parsed = JSON.parse(event.poster);
                    images = Array.isArray(parsed) ? parsed : [event.poster];
                }
            } catch {
                // If not valid JSON, treat as single image URL
                if (event.poster) images = [event.poster];
            }

            return {
                id: event.id,
                title: event.name,
                image: images[0] || null, // First image for backward compatibility
                images: images, // Full array for slider
                category: event.category?.name || 'Uncategorized',
                categoryId: event.categoryId,
                date: event.date.toLocaleDateString('vi-VN'), // e.g., 24/10/2023
                time: `${event.startTime || '00:00'} - ${event.endTime || '00:00'}`,
                location: event.location,
                price: event.price, // Raw numeric value
                priceDisplay: (() => {
                    const p = event.price as unknown as number | null;
                    return !p || p === 0 ? 'Miễn phí' : `${p.toLocaleString('vi-VN')} VND`;
                })(),
                description: event.description,
                content: (event as any).content,
                // Keeping raw date for sorting/editing if needed
                rawDate: event.date,
                startTime: event.startTime,
                endTime: event.endTime,
                itinerary: event.itinerary,
                timeline: event.timeline,
                isFeatured: (event as any).isFeatured ?? false,
                isHidden: (event as any).isHidden ?? false,
            };
        });

        // Sort by isFeatured first (true comes first)
        formattedEvents.sort((a, b) => {
            if (a.isFeatured === b.isFeatured) return 0;
            return a.isFeatured ? -1 : 1;
        });

        return NextResponse.json(formattedEvents);
    } catch (error) {
        console.error("GET events error:", error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Find or create category if needed, similar to menus
        // For now, assuming categoryId is passed or we find by name
        let categoryId = body.categoryId;

        // Handle empty string for categoryId which might cause foreign key constraint failure
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
                // Return 400 instead of crashing with 500
                return NextResponse.json({ error: 'Invalid Category ID: Category not found' }, { status: 400 });
            }
        }



        const newEvent = await prisma.event.create({
            data: {
                name: body.title,
                date: eventDate,
                poster: body.image || null,
                description: body.description || null,
                content: body.content || null,
                location: body.location || null,
                price: typeof body.price === 'number' ? body.price : (parseInt(body.price) || 0),
                startTime: body.startTime || null,
                endTime: body.endTime || null,
                isFeatured: body.isFeatured ?? false,
                isHidden: body.isHidden ?? false,
                // Use connect syntax for relation
                category: categoryId ? {
                    connect: { id: categoryId }
                } : undefined,
                // @ts-ignore: Prisma type generation check
                itinerary: body.itinerary || [],
                // @ts-ignore
                timeline: body.timeline || []
            } as any,
            include: {
                category: true
            }
        });

        return NextResponse.json(newEvent);
    } catch (error: any) {
        console.error("POST event error:", error);
        // Serialize error safely
        const errorMessage = error?.message || String(error);
        const errorStack = error?.stack || null;
        return NextResponse.json({
            error: 'Failed to create event',
            details: errorMessage,
            stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
        }, { status: 500 });
    }
}
