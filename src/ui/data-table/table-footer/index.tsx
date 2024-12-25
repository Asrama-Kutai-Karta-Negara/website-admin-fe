import { Button } from "@components/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TableFooter({
  pageIndex,
  pageCount,
  onPageChange,
}: {
  pageIndex: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  const visiblePages = 20;
  
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const startPage = Math.max(0, pageIndex - visiblePages);
    const endPage = Math.min(pageCount - 1, pageIndex + visiblePages);

     if (startPage > 0) {
      pages.push(0);
      if (startPage > 1) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

     if (endPage < pageCount - 1) {
      if (endPage < pageCount - 2) pages.push("...");
      pages.push(pageCount - 1);
    }
    return pages;
  };
  
  console.log("page index: "+ pageIndex);
  console.log("page count: "+ pageCount);

  return (
    <div className="flex items-center justify-between p-5 py-4">
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0 bg-transparent border-none"
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex <= 0}
        >
          <ChevronLeft
            className={
              pageIndex === 0 ? "text-gray-500" : "text-yellow-500 dark:text-[#964B00]"
            }
          />
        </Button>

        {generatePageNumbers().map((page, index) => {
          if (typeof page === "string") {
            return (
              <span key={index} className="text-gold dark:text-blonde">
                {page}
              </span>
            );
          }

          return (
            <Button
              key={index}
              variant={pageIndex === page ? "solid" : "outline"}
              className={`h-8 w-8 p-0 ${
                pageIndex === page
                  ? "text-gold dark:text-[#964B00] border-none bg-transparent"
                  : "text-black dark:text-white border-none bg-transparent"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </Button>
          );
        })}

        <Button
          variant="outline"
          className="h-8 w-8 p-0 bg-transparent border-none"
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
        >
          <ChevronRight
            className={
              pageIndex === pageCount -1
                ? "text-gray-500"
                : "text-yellow-500 dark:text-[#964B00]"
            }
          />
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        Menampilkan halaman ke-{pageIndex+1} dari {pageCount} halaman
      </div>
    </div>
  );
}
