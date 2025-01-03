"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/checkbox";
import { Payments } from "@interfaces/data-types";
import { SortableHeader } from "@components/SortableHeader";
import ProjectTextOrdering from "@ui/data-table/project-text-ordering";
import { ProjectActions } from "@ui/data-table/project-actions";
import ProjectDesignBadge from "@ui/data-table/project-design-badge";
import ProjectFile from "@ui/data-table/project-file";
import { paymentUrl } from "@constant/breadcrumbs";
import { format } from "date-fns";
import { formatCurrencyNoRp } from "@utils/format";

export const columns: ColumnDef<Payments>[] = [
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
    accessorKey: "resident_name",
    header: ({ column }) => (
      <SortableHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("resident_name")} width="30" />,
    enableSorting: true,
  },
  
  {
    accessorKey: "payment_file_name",
    enableHiding: true,
    cell: () => null,
  },
  {
    accessorKey: "payment_evidence",
    header: ({ column }) => (
      <SortableHeader column={column} title="Bukti Pembayaran" />
    ),
    cell: ({ row }) => {
      const fileName = row.getValue<string>("payment_file_name") || "Unnamed File";
      const file = row.getValue<string>("payment_evidence") || "";
      
      return (
        <ProjectFile
          name={fileName || "Unnamed File"}
          file={file}
        />
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "billing_date",
    header: ({ column }) => (
      <SortableHeader column={column} title= "Tanggal Tagihan"/>
    ),
    cell: ({ row }) => <ProjectTextOrdering name={` ${format(new Date( row.getValue("billing_date")), 'dd MMM yyyy')}`} width="20" />,
    enableSorting: true,
  },
  {
    accessorKey: "billing_amount",
    header: ({ column }) => (
      <SortableHeader column={column} title="Tagihan" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={`${formatCurrencyNoRp(row.getValue("billing_amount"))}`} width="20" />,
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <ProjectDesignBadge name={row.getValue("status")} width="4" />,
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => <ProjectActions row={row} path={paymentUrl} />,
  },
];
