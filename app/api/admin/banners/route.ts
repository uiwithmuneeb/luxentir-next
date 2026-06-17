import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  const banners = await prisma.heroBanner.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  return NextResponse.json(banners);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const banner = await prisma.heroBanner.create({
      data: {
        title: body.title,
        subtitle: body.subtitle || "",
        image: body.image,
        buttonText: body.buttonText || "",
        buttonLink: body.buttonLink || "",
        status: body.status || "Active",
        sortOrder: Number(body.sortOrder || 0),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/banners");

    return NextResponse.json(banner);
  } catch (error) {
    console.error("CREATE BANNER ERROR:", error);

    return NextResponse.json(
      { message: "Banner could not be created" },
      { status: 500 }
    );
  }
}