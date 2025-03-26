import { PaginationControl } from "@/components/pagination-control";
import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Gallery({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const imageSearchParams = await searchParams;
  const user = await CurrentUser();
  if (!user) return redirect("/sign-in");

  const page = Number(imageSearchParams.page) || 1;
  const pageSize = Number(imageSearchParams.pageSize) || 8;

  const skip = (page - 1) * pageSize;
  const generateImages = await db.generateImage.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });

  const totalImages = await db.generateImage.count({
    where: { userId: user.id },
  });
  const totalPages = Math.ceil(totalImages / pageSize);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col items-center space-y-6">
        <h1 className="font-semibold text-lg sm:text-xl md:text-2xl">
          Your Generated Images
        </h1>

        <div className="w-full my-4 sm:my-6">
          {generateImages.length === 0 ? (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              No images found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {generateImages.map((item) => (
                <div key={item.id} className="relative">
                  <Link href={`/gallery/${item.id}`}>
                    <img
                      src={item.image}
                      alt="Generated Image"
                      className="w-full aspect-auto h-48 sm:h-56 md:h-64 object-cover rounded-md transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <PaginationControl
          page={page}
          pageSize={pageSize}
          totalImages={totalImages}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
