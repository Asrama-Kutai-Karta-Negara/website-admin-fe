"use client";

import React, { useEffect, useState } from "react";
import Breadcumbs from "@ui/breadcrumbs";
import { DataTable } from '@ui/data-table';
import { MessageResponse, Payments } from "@interfaces/data-types";
import { columns } from './columns';
import DynamicCard from '@components/particel/dynamic-card';
import { Button } from '@components/button';
import { Plus, SearchIcon } from 'lucide-react';
import { TableFooter } from '@ui/data-table/table-footer';
import Link from "next/link";
import { breadCrumbsPaymentsIndex, paymentsTitle, paymentString, residentString } from "@constant/breadcrumbs";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payments[]>([]);
  const [pagination, setPagination] = useState<MessageResponse>({
    count: 1,
    current_page: 1,
    previous_page: 0,
    total_pages: 1,
    success: true,
    message: '',
    data: payments
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  
  const fetchPayments = async (page: number, query: string) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/payments?resident=${query}&page=${page+1}&limit=10`
      );
      const response = await res.json();
      const payments: Payments[] = response.data;
      setPayments(payments);
      setPagination({
        count: response.count,
        current_page: response.current_page,
        previous_page: response.previous_page,
        total_pages: response.total_pages,
        success: response.success,
        message: response.message,
        data: payments
      });
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  return (
    <>
      <div className='container max-w-screen-xl mx-auto px-4'>
        <Breadcumbs title={paymentsTitle} breadCrumbs={breadCrumbsPaymentsIndex} />
        <DynamicCard
        header={
          <div className='flex p-4 justify-between'>
            <Link href={'/payments/add'}>
              <Button   
                variant='outline'
                size={null}
                className='bg-yellow hover:bg-gold hover:text-blonde dark:text-black dark:hover:text-white border-0 p-2'
              >
                <Plus className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
                <span className='ml-1 '>Tambah {paymentString}</span>
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
            data={payments} 
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