import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        category: {
        connectOrCreate: {
            where: {
            slug: body.category.toLowerCase().replace(/\s+/g, "-"),
            },
            create: {
            name: body.category,
            slug: body.category.toLowerCase().replace(/\s+/g, "-"),
            },
        },
        },
        price: Number(body.price),
        comparePrice: body.comparePrice ? Number(body.comparePrice) : null,
        badge: body.badge,
        description: body.description,
        image: body.image,
        gallery: body.gallery,
        sizes: body.sizes,
        colors: body.colors,
        stock: Number(body.stock || 0),
        status: body.status,
        featured: Boolean(body.featured),
      },
    });

    return NextResponse.json(product);
    } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error);

    return NextResponse.json(
        {
        message: "Product could not be created",
        error: String(error),
        },
        { status: 500 }
    );
    }
}