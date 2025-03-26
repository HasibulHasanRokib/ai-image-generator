import { GenerateImage } from "@/components/generate-image";
import Modal from "@/components/modal";
import { db } from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const generatedImage = await db.generateImage.findUnique({
    where: { id },
    select: {
      image: true,
    },
  });
  if (!generatedImage) return null;
  return (
    <Modal>
      <GenerateImage image={generatedImage.image} />
    </Modal>
  );
}
