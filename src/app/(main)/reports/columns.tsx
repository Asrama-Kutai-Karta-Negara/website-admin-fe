"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/checkbox";
import { SortableHeader } from "@components/SortableHeader";
import ProjectTextOrdering from "@ui/data-table/project-text-ordering";
import { ProjectActions } from "@ui/data-table/project-actions";
import ProjectDesignBadge from "@ui/data-table/project-design-badge";
import { reportUrl } from "@constant/breadcrumbs";
import { format } from "date-fns";
import { formatCurrencyNoRp } from "@utils/format";
import ProjectFile from "@ui/data-table/project-file";
import { Report } from "@interfaces/data-types";

export const columns: ColumnDef<Report>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-foreground shadow-lg border red-500 data-[state=checked]:border-0 data-[state=checked]:bg-green-500"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-foreground shadow-lg border data-[state=checked]:border-0 data-[state=checked]:bg-green-500"
      >
        {row.getIsSelected() && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 m-auto w-4 h-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </Checkbox>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <SortableHeader column={column} title="No" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={`${row.index + 1}`} width="10" />,
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableHeader column={column} title="Judul Laporan" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("title")} width="30" />,
    enableSorting: true,
  },
  {
    accessorKey: "report_date",
    header: ({ column }) => (
      <SortableHeader column={column} title= "Tanggal"/>
    ),
    cell: ({ row }) => <ProjectTextOrdering name={` ${format(new Date( row.getValue("report_date")), 'dd MMM yyyy')}`} width="20" />,
    enableSorting: true,
  },
  {
    accessorKey: "report_amount",
    header: ({ column }) => (
      <SortableHeader column={column} title="Nominal" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={`${formatCurrencyNoRp(row.getValue("report_amount"))}`} width="20" />,
    enableSorting: true,
  },
  {
    accessorKey: "report_file_name",
    enableHiding: true,
    cell: () => null,
  },
  {
    accessorKey: "report_evidence",
    header: ({ column }) => (
      <SortableHeader column={column} title="Bukti" />
    ),
    cell: ({ row }) => {
      const fileName = row.getValue<string>("report_file_name") || "Tidak ada file";
      const file = row.getValue<string>("report_evidence") || "";
      
      return (
        <ProjectFile
          name={fileName}
          file={file}
        />
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "report_categories",
    header: ({ column }) => (
      <SortableHeader column={column} title="Kategori" />
    ),
    cell: ({ row }) => <ProjectDesignBadge name={row.getValue("report_categories")} width="50" />,
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => <ProjectActions row={row} path={reportUrl} />,
  },
];
