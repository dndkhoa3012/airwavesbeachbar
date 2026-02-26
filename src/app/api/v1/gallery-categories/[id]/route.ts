
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, description } = body;

        const category = await prisma.galleryCategory.update({
            where: { id },
            data: {
                name,
                description,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update gallery category" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.galleryCategory.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete gallery category" },
            { status: 500 }
        );
    }
}
