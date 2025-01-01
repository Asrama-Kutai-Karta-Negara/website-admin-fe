"use client";

import React, { useEffect, useState } from "react";
import Breadcumbs from "@ui/breadcrumbs";
import { DataTable } from '@ui/data-table';
import { columns } from './columns';
import DynamicCard from '@components/particel/dynamic-card';
import { Button } from '@components/button';
import { Plus, SearchIcon } from 'lucide-react';
import { TableFooter } from '@ui/data-table/table-footer';
import Link from "next/link";
import { breadCrumbsGalleriesIndex, galleriesTitle, galleryString } from "@constant/breadcrumbs";
import { Gallery, MessageResponse } from "@interfaces/data-types";
import { AxiosError } from "axios";
import SatellitePrivate from "@services/satellite/private";

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
      const res = await SatellitePrivate.get<MessageResponse>(
        `/galleries`,
        {
          params: {
            name: query,
            page: page + 1,
            limit: 10
          }
        }
      );
      const response = res.data;
      const galleries : Gallery[] = Array.isArray(response.data) ? response.data : [];
      setGalleries(galleries);
      setPagination({
        current_page: res.data.current_page,
        total_pages: res.data.total_pages,
        previous_page: res.data.previous_page,
        next_page: res.data.current_page + 1,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios Error: ", error.response?.data || error.message);
      } else {
        console.error("Error fetching galleries:", error);
      }
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
    <div className='container max-w-screen-xl mx-auto px-4'>
      <Breadcumbs title={galleriesTitle} breadCrumbs={breadCrumbsGalleriesIndex} />
      <DynamicCard
        header={
          <div className='flex p-4 justify-between'>
            <Link href={'/galleries/add'}>
              <Button   
                variant='outline'
                size={null}
                className='bg-yellow hover:bg-gold hover:text-blonde dark:text-black dark:hover:text-white border-0 p-2'
              >
                <Plus className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
                <span className='ml-1 '>Tambah {galleryString}</span>
              </Button>
            </Link>
            <div className="flex flex-row items-center rounded border">
              <SearchIcon className="ml-2 text-foreground" />
              <input
                type="text"
                placeholder={`Cari judul ${galleryString.toLowerCase()} disini...`}
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
  );
};