"use client";

import React, { useEffect, useState } from "react";
import Breadcumbs from "@ui/breadcrumbs";
import { DataTable } from '@ui/data-table';
import { Gallery } from '@interfaces/interface-items';
import { columns } from './columns';
import DynamicCard from '@components/particel/dynamic-card';
import { Button } from '@components/button';
import { Plus, SearchIcon } from 'lucide-react';
import { TableFooter } from '@ui/data-table/table-footer';

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

export default function GalleriesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    previous_page: 0,
    next_page: 1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  
  const fetchGalleries = async (page: number, query: string) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/galleries?name=${query}&page=${page+1}&limit=10`
      );
      const response = await res.json();
      const galleries: Gallery[] = response.data;
      setGalleries(galleries);
      setPagination({
        current_page: response.current_page,
        total_pages: response.total_pages,
        previous_page: response.previous_page,
        next_page: response.current_page + 1,
      });
    } catch (error) {
      console.error("Error fetching galleries:", error);
    }
  };

  useEffect(() => {
    fetchGalleries(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  return (
    <>
      <div className='container max-w-screen-xl mx-auto px-4'>
        <Breadcumbs title={breadCrumbs[0].name} breadCrumbs={breadCrumbs} />
        <DynamicCard
        header={
          <div className='flex p-4 justify-between'>
            <Button   
              variant='outline'
              size={null}
              className='bg-yellow hover:bg-gold hover:text-blonde dark:text-black dark:hover:text-white border-0 p-2'
            >
              <Plus className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
              <span className='ml-1 '>Tambah Media</span>
            </Button>
            <div className="flex flex-row items-center rounded border">
              <SearchIcon className="ml-2 text-foreground" />
              <input
                type="text"
                placeholder="Cari foto disini..."
                className="h-full py-0 px-2 border-none text-sm w-72 focus:outline-none focus:ring-1 focus:ring-background"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        }
        body={
          <DataTable 
            data={galleries} 
            columns={columns}
            footer={
              <TableFooter
                  pageIndex={currentPage}
                  pageCount={pagination.total_pages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
            }
          />
        }
      />
    </div>
    </>
  );
};