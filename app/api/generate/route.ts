import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const utapi = new UTApi();

    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7.5,
          height: 896,
          width: 1152,
          steps: 30,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to generate image from Stability AI" },
        { status: 400 }
      );
    }

    const data = await response.json();

    const imageBase64 = data.artifacts[0].base64;
    const imageBuffer = Buffer.from(imageBase64, "base64");

    const blob = new Blob([imageBuffer], { type: "image/png" });
    const file = new File([blob], `generated-${Date.now()}.png`, {
      type: "image/png",
    });

    const uploadResult = await utapi.uploadFiles(file);

    if (!uploadResult.data?.ufsUrl) {
      return NextResponse.json(
        { error: "Failed to upload image to UploadThing" },
        { status: 500 }
      );
    }

    const user = await CurrentUser();
    const uploadedUrl = uploadResult.data.ufsUrl;

    if (user) {
      await db.generateImage.create({
        data: {
          userId: user.id,
          image: uploadedUrl,
        },
      });
    }

    return NextResponse.json({ image: uploadedUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 }
    );
  }
}
