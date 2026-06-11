import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        slug: slugify(body.name),
        price: Number(body.price),
        comparePrice: body.comparePrice ? Number(body.comparePrice) : null,
        badge: body.badge,
        status: body.status,
        image: body.image,
        description: body.description,
        category: {
          connectOrCreate: {
            where: {
              slug: slugify(body.category),
            },
            create: {
              name: body.category,
              slug: slugify(body.category),
            },
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "Product could not be updated" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "Product could not be deleted" },
      { status: 500 }
    );
  }
}