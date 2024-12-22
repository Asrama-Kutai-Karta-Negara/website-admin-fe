export interface BreadCrumb  {
  name: string;
  url: string;
}

export interface BreadCrumbsProps {
  title: string;
  breadCrumbs: BreadCrumb[];
}

export interface TableProps {
  limit?: number;
  title?: string;
}

export type Gallery = {
  id: string;
  name: string;
  email: string;
  image: string;
  lastSeen: string;
}