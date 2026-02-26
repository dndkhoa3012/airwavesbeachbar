
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const pageType = searchParams.get('pageType');
        const deviceType = searchParams.get('deviceType');

        const where: any = {};
        if (pageType) where.pageType = pageType.toUpperCase();
        if (deviceType) where.deviceType = deviceType.toUpperCase();

        const banners = await prisma.banner.findMany({
            where,
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' }
            ],
        });

        return NextResponse.json(banners);
    } catch (error) {
        console.error('Error fetching banners:', error);
        return NextResponse.json(
            { error: "Failed to fetch banners" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { pageType, deviceType, title, subtitle, imageUrls, altText, isActive, order } = body;

        if (!pageType || !imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
            return NextResponse.json(
                { error: "pageType and at least one image are required" },
                { status: 400 }
            );
        }

        // Validate pageType
        const validPageTypes = ['HOME', 'MENU', 'EVENTS'];
        if (!validPageTypes.includes(pageType.toUpperCase())) {
            return NextResponse.json(
                { error: "Invalid pageType. Must be HOME, MENU, or EVENTS" },
                { status: 400 }
            );
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

        const banner = await prisma.banner.create({
            data: {
                pageType: pageType.toUpperCase(),
                deviceType: deviceType?.toUpperCase() || 'DESKTOP',
                title,
                subtitle,
                imageUrls,
                altText,
                isActive: isActive ?? true,
                order: order ?? 0,
            },
        });

        return NextResponse.json(banner);
    } catch (error) {
        console.error('Error creating banner:', error);
        return NextResponse.json(
            { error: "Failed to create banner" },
            { status: 500 }
        );
    }
}
