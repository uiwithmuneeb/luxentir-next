import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sections = await prisma.homepageSection.findMany();

    return NextResponse.json(sections);
  } catch (error) {
    console.error("CONTENT LOAD ERROR:", error);

    return NextResponse.json(
      { message: "Failed to load content" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    for (const section of body.sections || []) {
      await prisma.homepageSection.upsert({
        where: {
          key: String(section.key),
        },
        update: {
          title: String(section.title || ""),
          subtitle: String(section.subtitle || ""),
          content: String(section.content || section.subtitle || section.title || "Content"),
          enabled: Boolean(section.enabled),
        },
        create: {
          key: String(section.key),
          title: String(section.title || ""),
          subtitle: String(section.subtitle || ""),
          content: String(section.content || section.subtitle || section.title || "Content"),
          enabled: Boolean(section.enabled),
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/content");
    revalidatePath("/about");
    revalidatePath("/privacy-policy");
    revalidatePath("/terms");
    revalidatePath("/exchange-and-returns");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTENT SAVE ERROR:", error);

    return NextResponse.json(
      { message: "Failed to save content", error: String(error) },
      { status: 500 }
    );
  }
}