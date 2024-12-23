"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/checkbox";
import { Gallery } from "@interfaces/interface-items";
import { SortableHeader } from "@components/SortableHeader";
import ProjectTextOrdering from "@ui/data-table/project-text-ordering";
// import ProjectFile from "@ui/data-table/project-file";
import { ProjectActions } from "@ui/data-table/project-actions";

export const columns: ColumnDef<Gallery>[] = [
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
        className="border-border bg-white shadow-lg border data-[state=checked]:border-0"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-border bg-white shadow-lg border data-[state=checked]:border-0"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <SortableHeader column={column} title="#" className="w-[50px]" />
    ),
    cell: ({ row }) => <div className="w-[50px]">{row.index + 1}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableHeader column={column} title="Judul Media" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("title")} />,
    enableSorting: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <SortableHeader column={column} title="Tipe Media" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("type")} />,
    enableSorting: true,
  },
  {
    accessorKey: "category_name",
    header: ({ column }) => (
      <SortableHeader column={column} title="Kategori Media" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("category_name")} />,
    enableSorting: true,
  },
  {
    accessorKey: "category_id",
    header: ({ column }) => (
      <SortableHeader column={column} title="File Media" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("category_id")} />,
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => <ProjectActions row={row} />,
  },
];