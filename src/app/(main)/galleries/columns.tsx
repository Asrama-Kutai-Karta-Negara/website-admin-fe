"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/checkbox";
import { Gallery } from "@interfaces/interface-items";
import { SortableHeader } from "@components/SortableHeader";
import ProjectTextOrdering from "@ui/data-table/project-text-ordering";
import ProjectFile from "@ui/data-table/project-file";
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
      <SortableHeader column={column} title="Judul Media" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("title")} width="80" />,
    enableSorting: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <SortableHeader column={column} title="Tipe Media" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("type")} width="30" />,
    enableSorting: true,
  },
  {
    accessorKey: "category_name",
    header: ({ column }) => (
      <SortableHeader column={column} title="Kategori Media" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("category_name")} width="30" />,
    enableSorting: true,
  },
  {
    accessorKey: "file_name",
    header: "Nama File",
    enableHiding: true,
    cell: () => null,
  },
  {
    accessorKey: "file",
    header: ({ column }) => (
      <SortableHeader column={column} title="File Media" />
    ),
    cell: ({ row }) => {
      const fileName = row.getValue<string>("file_name") || "Unnamed File";
      const file = row.getValue<string>("file") || "";
      
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
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => <ProjectActions row={row} />,
  },
];
