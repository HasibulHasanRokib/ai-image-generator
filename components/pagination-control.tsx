import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface PaginationControlProps {
  totalPages: number;
  page: number;
  pageSize: number;
  totalImages: number;
}

export function PaginationControl({
  page,
  pageSize,
  totalImages,
  totalPages,
}: PaginationControlProps) {
  return (
    <>
      {totalPages > 1 && (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <Pagination className="w-full sm:w-auto">
            <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href={
                    page > 1
                      ? `/gallery?page=${page - 1}&pageSize=${pageSize}`
                      : "#"
                  }
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href={`/gallery?page=${p}&pageSize=${pageSize}`}
                    isActive={p === page}
                    className="text-sm sm:text-base"
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={
                    page < totalPages
                      ? `/gallery?page=${page + 1}&pageSize=${pageSize}`
                      : "#"
                  }
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <p className="text-xs sm:text-sm text-gray-500 text-center">
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, totalImages)} of {totalImages} images
          </p>
        </div>
      )}
    </>
  );
}
