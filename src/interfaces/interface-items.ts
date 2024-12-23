import { ColumnDef, Row } from "@tanstack/react-table";

export interface BreadCrumb  {
  name: string;
  url: string;
}
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface BreadCrumbsProps {
  title: string;
  breadCrumbs: BreadCrumb[];
}

export type Gallery = {
  id: string;
  name: string;
  email: string;
  image: string;
  lastSeen: string;
  createdAt: string;
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
  image?: string;
}