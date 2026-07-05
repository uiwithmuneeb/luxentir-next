import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        slug: body.slug || slugify(body.name),
        image: body.image || null,
        description: body.description || null,
        featured: Boolean(body.featured),
        sortOrder: Number(body.sortOrder || 0),
        status: body.status || "Active",
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/");
    revalidatePath("/shop");

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Category could not be updated." },
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

    const count = await prisma.product.count({
      where: {
        categoryId: Number(id),
      },
    });

    if (count > 0) {
      return NextResponse.json(
        {
          message:
            "Category contains products. Delete or move them first.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/");
    revalidatePath("/shop");

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Category could not be deleted.",
      },
      {
        status: 500,
      }
    );
  }
}