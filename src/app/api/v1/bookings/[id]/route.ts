import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const id = params.id;
        const booking = await prisma.booking.findUnique({
            where: { id },
        });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json(booking);
    } catch (error) {
        console.error("GET booking error:", error);
        return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 });
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const id = params.id;
        const body = await request.json();

        // Ensure we are updating all fields as requested before
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                status: body.status,
                ...(body.customerName && { customerName: body.customerName }),
                ...(body.phoneNumber && { phoneNumber: body.phoneNumber }),
                ...(body.email && { email: body.email }),
                ...(body.date && { bookingDate: new Date(body.date) }),
                ...(body.time && { time: body.time }),
                ...(body.guests && { guestCount: Number(body.guests) }),
                ...(body.area && { area: body.area }),
                ...(body.note && { note: body.note }),
            },
        });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        console.error("PUT booking error:", error);
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const id = params.id;
        await prisma.booking.update({
            where: { id },
            data: { status: 'deleted' },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE booking error:", error);
        return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
    }
}
