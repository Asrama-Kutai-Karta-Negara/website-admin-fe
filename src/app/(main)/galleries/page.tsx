import React from 'react';
import Breadcumbs from "@ui/breadcrumbs";
import { DataTable } from '@ui/data-table';
import { Gallery } from '@interfaces/interface-items';
import { columns } from './columns';

const breadCrumbs = [
  { 
    name: "Kelola Foto", 
    url: "/" 
  },
  {
    name: "Daftar Foto",
    url: "/products/1",
  },
];

export default async function GalleriesPage() {
  const res = await fetch('http://127.0.0.1:8000/api/v1/galleries')
  const response = await res.json();
  const galleries: Gallery[] = response.data;
  console.log(galleries);
  return (
    <>
    <div className="overflow-x-auto max-w-screen">
      <Breadcumbs title={breadCrumbs[0].name} breadCrumbs={breadCrumbs} />
      <DataTable data={galleries} columns={columns} />
    </div>
    </>
  );
};


