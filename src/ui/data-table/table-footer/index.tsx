import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/select";
import { Button } from "@components/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TableFooter<TData>({ table }: { table: Table<TData> }) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const visiblePages = 3;
  
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
  return (
    <div className="flex items-center justify-between p-5 py-4">
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0 bg-transparent border-none"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className={pageIndex === 0 ? "text-gray-500": "text-yellow-500 dark:text-[#964B00]"} />
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
              className={`h-8 w-8 p-0 p ${
              pageIndex === page
                  ? "text-gold dark:text-[#964B00] border-none bg-transparent"
                  : "text-black dark:text-white border-none bg-transparent"
              } `}
              onClick={() => table.setPageIndex(page)}
            >
              {page + 1}
            </Button>
          );
        })}

        <Button
          variant="outline"
          className="h-8 w-8 p-0 bg-transparent border-none"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className={pageIndex === pageCount - 1 ? "text-gray-500": "text-yellow-500 dark:text-[#964B00]"} />
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}