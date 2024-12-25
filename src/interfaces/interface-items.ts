import { ColumnDef, Row } from "@tanstack/react-table";

export interface BreadCrumb  {
  name: string;
  url: string;
}
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  footer: React.ReactNode;
}

export interface BreadCrumbsProps {
  title: string;
  breadCrumbs: BreadCrumb[];
}

export type Gallery = {
  category_id: string;
  category_name: string;
  created_at: string;
  file: string;
  file_name: string;
  id: string;
  title: string;
  type: string;
  updated_at: string;
}

export interface IItem {
  index: number;
  label: string;
  value: "all" | "risk" | "onHold" | "potentialRisk" | "onTrack" | "archived";
  number: number;
}

export interface ProjectActionsProps<TData> {
  row: Row<TData>;
}


export type DynamicCardProps = {
  header?: React.ReactNode;
  body?: React.ReactNode;
  border?: boolean;
}