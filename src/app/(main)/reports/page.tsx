'use client';

import React, { useEffect, useState } from "react";
import Breadcumbs from "@ui/breadcrumbs";
import { DataTable } from '@ui/data-table';
import DynamicCard from '@components/particel/dynamic-card';
import { Button } from '@components/button';
import { ArrowUpFromLine, Plus, RefreshCcw, SearchIcon } from 'lucide-react';
import { TableFooter } from '@ui/data-table/table-footer';
import Link from "next/link";
import { createTitleAndBreadcrumbs, paymentString, reportString, reportUrl } from "@constant/breadcrumbs";
import SatellitePrivate from "@services/satellite/private";
import { ExportReportForm, MessageResponse, Report } from "@interfaces/data-types";
import { AxiosError } from "axios";
import { columns } from "./columns";
import { useQueryClient } from "./hook";
import ModalExport from "@ui/data/modal-export";

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    previous_page: 0,
    next_page: 1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isExportModalOpen, setExportModalOpen] = useState(false);
  
  const { syncPayment, exportReport } = useQueryClient();
  
  const fetchReports = async (page: number, query: string) => {
    try {
      const res = await SatellitePrivate.get<MessageResponse>(
        `/reports`,
        {
          params: {
            title: query,
            page: page + 1,
            limit: 10
          }
        }
      );
      const response = res.data;
      const reports : Report[] = Array.isArray(response.data) ? response.data : [];
      setReports(reports);
      setPagination({
        current_page: res.data.current_page,
        total_pages: res.data.total_pages,
        previous_page: res.data.previous_page,
        next_page: res.data.current_page + 1,
      });
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios Error: ", error.response?.data || error.message);
      } else {
        console.error("Error fetching reports:", error);
      }
    }
  };

  useEffect(() => {
    fetchReports(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const handleSync = async () => {
    setIsLoading(true);
    await syncPayment(() => {
      window.location.href = '/reports';
    });
  }

  const handleExport = async (data: ExportReportForm) => {
    setIsLoading(true);
     try {
      await exportReport(data, () => {});
    } catch (error) {
      console.error("Error exporting report:", error);
    } finally {
      setIsLoading(false); 
      setExportModalOpen(false);
    }
  };


  const breadcrumbs = createTitleAndBreadcrumbs(reportString, reportUrl);
  return (
    <div className='container max-w-screen-xl mx-auto px-4'>
      <Breadcumbs title={breadcrumbs.mainTitle} breadCrumbs={breadcrumbs.breadCrumbsMain} />
      <DynamicCard
        header={
          <div className='flex p-4 justify-between'>
            <div className="flex space-x-2">
              <Link href={'/reports/add'}>
                <Button   
                  variant='outline'
                  size={null}
                  disabled={isLoading}
                  className='bg-yellow hover:bg-gold hover:text-blonde dark:text-black dark:hover:text-white border-0 p-2'
                >
                  <Plus className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
                  <span className='ml-1 '>Tambah {reportString}</span>
                </Button>
              </Link>
              <Button   
                variant='outline'
                size={null}
                disabled={isLoading}
                onClick={() => setExportModalOpen(true)}
                className='border-background border-0 p-2'
              >
                <ArrowUpFromLine className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
                <span className='ml-1 '>Ekspor</span>
              </Button>
              <Button
                variant='outline'
                size={null}
                disabled={isLoading}
                onClick={()=> handleSync()}
                className='bg-transparent border-0 p-2'
              >
                <RefreshCcw className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
                <span className='ml-1 '>Sinkron {paymentString}</span>
              </Button>
            </div>
            
            <div className="flex flex-row items-center rounded border">
              <SearchIcon className="ml-2 text-foreground" />
              <input
                type="text"
                placeholder={`Cari judul ${reportString.toLowerCase()} disini...`}
                className="h-full py-0 px-2 border-none text-sm w-72 focus:outline-none focus:ring-1 focus:ring-background"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        }
        body={
          <DataTable 
            data={reports} 
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
      <ModalExport
        isOpen={isExportModalOpen}
        isLoading={false}
        onClose={() => setExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
}
