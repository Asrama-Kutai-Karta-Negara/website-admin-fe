'use client';

import React, { useState, } from "react";
import { DataTableProps } from "@interfaces/interface-items";

import { 
    Table, 
    TableCell, 
    TableRow,
    TableBody
} from "@components/table";

import { 
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import TableHeader from "./table-header";
import { columnVisibilityItems } from "@constant/condition/visibility-column";

export function DataTable<TData, TValue>({
  columns,
  data,
  footer,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const initialColumnVisibility = columnVisibilityItems.reduce((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {} as Record<string, boolean>);

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(initialColumnVisibility);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      sorting,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="flex flex-col">
      <div className="relative w-full">
        <Table>
          <TableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    if (columnVisibility[cell.column.id] === false) {
                      return null;
                    }
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {footer}
    </div>
  );
}