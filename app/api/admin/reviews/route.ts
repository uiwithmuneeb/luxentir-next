import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("ADMIN REVIEWS GET ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}