"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@components/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@components/select";
import { ModalExportProps } from "@interfaces/interface-items";
import { ExportReportForm } from "@interfaces/data-types";

const ModalExport: React.FC<ModalExportProps> = ({ 
  isOpen, 
  isLoading, 
  onClose, 
  onExport 
}) => {

  const [isExporting, setIsExporting] = useState(false);

  const form = useForm<ExportReportForm>({
    defaultValues: {
      range_date: "1",
      format_file: "PDF",
    },
  });

  const options: { value: string; text: string }[] = [
    { value: "1", text: "1 Bulan" },
    { value: "3", text: "3 Bulan" },
    { value: "12", text: "1 Tahun" },
    { value: "0", text: "Semua Waktu" },
  ];

  const handleFormSubmit = async() => {
    // const data: ExportReportForm = form.getValues();
    // onExport(data);

    setIsExporting(true);
    const data = form.getValues();
    try {
      await onExport(data);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-600 p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold">Ekspor Laporan Keuangan</h2>
        <p className="text-md text-gray-400">
          Silahkan pilih jangka waktu laporan yang ingin diekspor dan pilih format.
        </p>

        <Form {...form}>
          <form className="space-y-4 w-full" onSubmit={form.handleSubmit(handleFormSubmit)}>
            {/* Pilih Jangka Waktu */}
            <FormField
              control={form.control}
              name="range_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs dark:text-white">Pilih Jangka Waktu</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        aria-label="Pilih Jangka Waktu"
                        className="bg-background"
                      >
                        <SelectValue placeholder="-- Pilih Jangka Waktu --" />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((item) => (
                          <SelectItem value={item.value} key={item.value}>
                            {item.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="format_file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs dark:text-white">Pilih Format File</FormLabel>
                  <FormControl>
                    <div className="flex justify-between space-x-2 mb-4">
                      <Button
                        type="button"
                        onClick={() => field.onChange("PDF")}                        
                        className={`bg-transparent px-4 py-2 rounded w-[50%] border-gold border-2 text-gold hover:bg-gold hover:text-blonde
                          ${
                            field.value === "PDF"
                              ? "bg-blonde text-gold "
                              : ""
                          }
                        `}
                      >
                        PDF
                      </Button>
                      <Button
                        type="button"
                        onClick={() => field.onChange("Excel")}
                        className={`bg-transparent px-4 py-2 rounded w-[50%] border-gold border-2 text-gold hover:bg-gold hover:text-blonde ${
                          field.value === "Excel"
                            ? "bg-gold text-blonde"
                            : ""
                        }`}
                      >
                        Excel
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between space-x-2 mt-4">
              <Button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                variant="outline"
                className="mt-4 w-[50%] px-4 py-2 bg-background text-gray-500 dark:text-white hover:bg-gray-800 hover:text-white"
              >
                Tutup
              </Button>
              <Button
                type="submit"
                disabled={isLoading || isExporting}
                className="mt-4 w-[50%] px-4 py-2 bg-yellow text-gray-500 hover:bg-gold hover:text-blonde dark:text-black dark:hover:text-gray-400"
              >
                 {isExporting ? "Mengunduh..." : "Download"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ModalExport;
