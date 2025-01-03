"use client";

import React, { useEffect, useState } from "react";
import Breadcumbs from "@ui/breadcrumbs";
import { DataTable } from '@ui/data-table';
import { MessageResponse, Resident } from "@interfaces/data-types";
import { columns } from './columns';
import DynamicCard from '@components/particel/dynamic-card';
import { Button } from '@components/button';
import { Plus, SearchIcon } from 'lucide-react';
import { TableFooter } from '@ui/data-table/table-footer';
import Link from "next/link";
import { createTitleAndBreadcrumbs, residentString, residentUrl } from "@constant/breadcrumbs";
import SatellitePrivate from "@services/satellite/private";

export default function ResidentsPage() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [pagination, setPagination] = useState<MessageResponse>({
    count: 1,
    current_page: 1,
    previous_page: 0,
    total_pages: 1,
    success: true,
    message: '',
    data: residents
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  
  const fetchResidents = async (page: number, query: string) => {
    try {
      const res = await SatellitePrivate.get<MessageResponse>(
        `/residents`,
        {
          params: {
            name: query,
            page: page + 1,
            limit: 10
          }
        }
      );
      const response = res.data;
      const residents: Resident[] = Array.isArray(response.data) ? response.data : [];
      setResidents(residents);
      setPagination({
        count: response.count,
        current_page: response.current_page,
        previous_page: response.previous_page,
        total_pages: response.total_pages,
        success: response.success,
        message: response.message,
        data: residents
      });
    } catch (error) {
      console.error("Error fetching residents:", error);
    }
  };

  useEffect(() => {
    fetchResidents(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const breadcrumbs = createTitleAndBreadcrumbs(residentString, residentUrl);
  return (
    <div className='container max-w-screen-xl mx-auto px-4'>
      <Breadcumbs title={breadcrumbs.indexTitle} breadCrumbs={breadcrumbs.breadcrumbsIndex} />
      <DynamicCard
        header={
          <div className='flex p-4 justify-between'>
            <Link href={'/residents/add'}>
              <Button   
                variant='outline'
                size={null}
                className='bg-yellow hover:bg-gold hover:text-blonde dark:text-black dark:hover:text-white border-0 p-2'
              >
                <Plus className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
                <span className='ml-1 '>Tambah {residentString}</span>
              </Button>
            </Link>
            <div className="flex flex-row items-center rounded border">
              <SearchIcon className="ml-2 text-foreground" />
              <input
                type="text"
                placeholder={`Cari nama ${residentString.toLowerCase()} disini...`}
                className="h-full py-0 px-2 border-none text-sm w-72 focus:outline-none focus:ring-1 focus:ring-background"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        }
        body={
          <DataTable 
            data={residents} 
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