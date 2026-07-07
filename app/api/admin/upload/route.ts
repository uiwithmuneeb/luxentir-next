import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const allowedFolders = [
  "products",
  "gallery",
  "collections",
  "banners",
  "categories",
  "reels",
];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  return NextResponse.json({
    message: "Luxentir Cloudinary upload API is working",
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const folderValue = String(formData.get("folder") || "products");

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 },
      );
    }

    if (!allowedFolders.includes(folderValue)) {
      return NextResponse.json(
        { message: "Invalid upload folder" },
        { status: 400 },
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Only JPG, PNG, WebP, GIF, MP4, WebM or MOV files are allowed" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "File size must be less than 10MB" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const isVideo = file.type.startsWith("video/");

    const result = await cloudinary.uploader.upload(base64, {
      folder: `luxentir/${folderValue}`,
      resource_type: isVideo ? "video" : "image",
      quality: "auto",
      fetch_format: "auto",
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
    });
  } catch (error) {
    console.error("UNIVERSAL CLOUDINARY UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        message: "File could not be uploaded",
        error: String(error),
      },
      { status: 500 },
    );
  }
}