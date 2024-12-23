
import { 
    flexRender,
    Table 
} from "@tanstack/react-table";

import {
  TableHead,
  TableHeader as ShadTableHeader,
  TableRow,
} from "@components/table";

const TableHeader = <TData, _>({ table }: { table: Table<TData> }) => {
  return (
    <ShadTableHeader className="bg-background text-foreground">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                className="h-[34px]"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </ShadTableHeader>
  );
};

export default TableHeader;