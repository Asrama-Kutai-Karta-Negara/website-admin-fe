"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/checkbox";
import { Residents } from "@interfaces/data-types";
import { SortableHeader } from "@components/SortableHeader";
import ProjectTextOrdering from "@ui/data-table/project-text-ordering";
import { ProjectActions } from "@ui/data-table/project-actions";
import ProjectDesignBadge from "@ui/data-table/project-design-badge";
import { residentUrl } from "@constant/breadcrumbs";

export const columns: ColumnDef<Residents>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("name")} width="20" />,
    enableSorting: true,
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <SortableHeader column={column} title="Umur" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={`${row.getValue("age")}`} width="10" />,
    enableSorting: true,
  },
  {
    accessorKey: "origin_campus",
    header: ({ column }) => (
      <SortableHeader column={column} title="Asal Kampus" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("origin_campus")} width="20" />,
    enableSorting: true,
  },
  {
    accessorKey: "origin_city",
    header: ({ column }) => (
      <SortableHeader column={column} title="Asal Kota" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("origin_city")} width="20" />,
    enableSorting: true,
  },
  {
    accessorKey: "room_number",
    header: ({ column }) => (
      <SortableHeader column={column} title="No Kamar" />
    ),
    cell: ({ row }) => <ProjectTextOrdering name={row.getValue("room_number")} width="20" />,
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <ProjectDesignBadge name={row.getValue("status")} width="30" />,
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => <ProjectActions row={row} path={residentUrl} />,
  },
];
