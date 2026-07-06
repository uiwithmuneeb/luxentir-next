import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const collection = await prisma.collection.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        image: body.image || null,
        status: body.status || "Active",
        featured: Boolean(body.featured),
        sortOrder: Number(body.sortOrder || 0),
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.error("CREATE COLLECTION ERROR:", error);

    return NextResponse.json(
      { message: "Collection could not be created" },
      { status: 500 }
    );
  }
}