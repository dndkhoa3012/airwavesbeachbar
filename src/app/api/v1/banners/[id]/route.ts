
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const banner = await prisma.banner.findUnique({
            where: { id: params.id },
        });

        if (!banner) {
            return NextResponse.json(
                { error: "Banner not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(banner);
    } catch (error) {
        console.error('Error fetching banner:', error);
        return NextResponse.json(
            { error: "Failed to fetch banner" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const body = await request.json();
        const { pageType, deviceType, title, subtitle, imageUrls, altText, isActive, order } = body;

        // Validate pageType if provided
        if (pageType) {
            const validPageTypes = ['HOME', 'MENU', 'EVENTS'];
            if (!validPageTypes.includes(pageType.toUpperCase())) {
                return NextResponse.json(
                    { error: "Invalid pageType. Must be HOME, MENU, or EVENTS" },
                    { status: 400 }
                );
            }
        }

        // Validate deviceType if provided
        if (deviceType) {
            const validDeviceTypes = ['DESKTOP', 'MOBILE'];
            if (!validDeviceTypes.includes(deviceType.toUpperCase())) {
                return NextResponse.json(
                    { error: "Invalid deviceType. Must be DESKTOP or MOBILE" },
                    { status: 400 }
                );
            }
        }

        // Validate imageUrls if provided
        if (imageUrls !== undefined && (!Array.isArray(imageUrls) || imageUrls.length === 0)) {
            return NextResponse.json(
                { error: "At least one image is required" },
                { status: 400 }
            );
        }

        const banner = await prisma.banner.update({
            where: { id: params.id },
            data: {
                ...(pageType && { pageType: pageType.toUpperCase() }),
                ...(deviceType && { deviceType: deviceType.toUpperCase() }),
                ...(title !== undefined && { title }),
                ...(subtitle !== undefined && { subtitle }),
                ...(imageUrls !== undefined && { imageUrls }),
                ...(altText !== undefined && { altText }),
                ...(isActive !== undefined && { isActive }),
                ...(order !== undefined && { order }),
            },
        });

        return NextResponse.json(banner);
    } catch (error: any) {
        console.error('Error updating banner:', error);
        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: "Banner not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: "Failed to update banner" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        await prisma.banner.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: "Banner deleted successfully" });
    } catch (error: any) {
        console.error('Error deleting banner:', error);
        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: "Banner not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: "Failed to delete banner" },
            { status: 500 }
        );
    }
}
