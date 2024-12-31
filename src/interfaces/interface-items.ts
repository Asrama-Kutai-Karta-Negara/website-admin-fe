import { ColumnDef, Row } from "@tanstack/react-table";

export interface BreadCrumb  {
  name: string;
  url: string;
}

export interface BreadCrumbsProps {
  title: string;
  breadCrumbs: BreadCrumb[];
}

export interface RadioButtonItem  {
  name: string;
  value: string;
}

export interface RadioButtonProps {
  radioButton: RadioButtonItem[];
  defaultValue?: string; 
  ariaLabel: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  footer: React.ReactNode;
}

export interface ProjectActionsProps<TData> {
  row: Row<TData>;
}

export interface DynamicCardProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  border?: boolean;
}

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirm_password?: string[];
      };
      message?: string;
      status: boolean | false;
    }
  | undefined;
