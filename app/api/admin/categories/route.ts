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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const category = await prisma.category.create({
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
      { message: "Category could not be created." },
      { status: 500 }
    );
  }
}