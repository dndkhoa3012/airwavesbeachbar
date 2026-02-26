
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const categories = await prisma.galleryCategory.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { collections: true },
                },
            },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch gallery categories" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description } = body;

        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            );
        }

        const category = await prisma.galleryCategory.create({
            data: {
                name,
                description,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create gallery category" },
            { status: 500 }
        );
    }
}
