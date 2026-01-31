import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Format data to match frontend expectations
        const formattedBookings = bookings.map(booking => ({
            id: booking.id,
            customer: {
                name: booking.customerName,
                phone: booking.phoneNumber,
                email: booking.email || '',
                // Avatar logic would go here. For now using initials/colors or placeholders
                avatar: booking.customerName.substring(0, 2).toUpperCase(),
                color: "bg-blue-500", // You might want dynamic colors based on ID or name
                isImage: false, // Default to no image for now
            },
            date: booking.bookingDate.toLocaleDateString('vi-VN'), // e.g., 24/10/2023
            time: booking.time || booking.bookingDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            guests: booking.guestCount,
            area: booking.area || '-',
            note: booking.note || '-',
            status: booking.status,
        }));

        return NextResponse.json(formattedBookings);
    } catch (error) {
        console.error("GET bookings error:", error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Creating booking with body:", body);

        // Basic validation
        if (!body.customerName || !body.phoneNumber || !body.date || !body.guests) {
            console.error("Missing required fields:", body);
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const bookingDate = new Date(body.date);
        if (isNaN(bookingDate.getTime())) {
            console.error("Invalid date:", body.date);
            return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
        }

        console.log("Parsed Booking Date:", bookingDate);

        const newBooking = await prisma.booking.create({
            data: {
                customerName: body.customerName,
                phoneNumber: body.phoneNumber,
                email: body.email,
                bookingDate: bookingDate,
                time: body.time,
                guestCount: Number(body.guests),
                area: body.area,
                note: body.note,
                status: body.status || 'pending',
            },
        });

        console.log("Booking created successfully:", newBooking);
        return NextResponse.json(newBooking);
    } catch (error: any) {
        console.error("POST booking error details:", error);
        return NextResponse.json({ error: error.message || 'Failed to create booking', details: String(error) }, { status: 500 });
    }
}
