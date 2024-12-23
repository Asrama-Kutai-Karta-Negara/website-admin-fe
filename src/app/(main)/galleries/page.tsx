import React from 'react';
import Breadcumbs from "@ui/breadcrumbs";
import { DataTable } from '@ui/data-table';
import { Gallery } from '@interfaces/interface-items';
import { columns } from './columns';
import DynamicCard from '@components/particel/dynamic-card';
import { Button } from '@components/button';
import { Plus } from 'lucide-react';

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
      <div className='container max-w-screen-xl mx-auto px-4'>
        <Breadcumbs title={breadCrumbs[0].name} breadCrumbs={breadCrumbs} />
        <DynamicCard
        header={
          <div className='px-2 py-2 flex justify-between'>
            <Button   
              variant='outline'
              size={null}
              className='bg-yellow hover:bg-gold hover:text-blonde border-0 p-2'
            >
              <Plus className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <span className='ml-1'>Tambah Media</span>
            </Button>
            <Button   
              variant='outline'
              size={null}
              className='bg-yellow hover:bg-gold hover:text-blonde border-0 p-2'
            >
              <Plus className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <span className='ml-1'>Tambah Media</span>
            </Button>
          </div>
        }
        body={
          <div>
            <p className="text-gray-700">
              This is a flexible body. You can place any content here!
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Click Me
            </button>
          </div>
        }
      />
    </div>
      
    {/* <div className="overflow-x-auto max-w-screen">
      <DataTable data={galleries} columns={columns} /> 
    </div>*/}
    </>
  );
};


