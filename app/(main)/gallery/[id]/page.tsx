import { GenerateImage } from "@/components/generate-image";

import { db } from "@/lib/prisma";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const generatedImage = await db.generateImage.findUnique({
    where: { id },
  });
  if (!generatedImage) return null;
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 flex flex-col items-center space-y-5">
      <h1 className="font-semibold text-xl">Generated Image</h1>
      <GenerateImage image={generatedImage?.image} />
    </div>
  );
}
