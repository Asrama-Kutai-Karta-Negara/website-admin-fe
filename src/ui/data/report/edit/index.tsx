
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/form';
import { Input } from '@components/input';
import { ReportEditForm, ResidentSelect } from '@interfaces/data-types';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@components/select';
import { Popover, PopoverContent, PopoverTrigger } from '@components/popover';
import { Button } from '@components/button';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon } from "@mynaui/icons-react";
import { Calendar } from "@components/calendar";
import { cn } from "@/lib/utils";
import { bytesToMb, formatCurrency } from '@utils/format';
import { CloudUpload, File } from 'lucide-react';
import { addReportForm } from '@constant/data/report';
import { reportString } from '@constant/breadcrumbs';

export default function EditReports({ 
  formData,
  onSubmit 
}: { 
  formData: ReportEditForm | undefined;
  onSubmit: (data: ReportEditForm) => void 
}) {
  const [categories, setCategories] = useState<{ value: string; text: string }[]>([
    { value: "Pemasukan", text: 'Pemasukan' },
    { value: "Pengeluaran", text: 'Pengeluaran' }
  ]);

  const form = useForm<ReportEditForm>({
    defaultValues: formData || {
      title: '',
      report_date: '',
      report_date_convert: undefined,
      report_amount: '',
      report_categories: '',
      report_evidence: undefined,
      files: undefined
    },
  });

  const [previousData, setPreviousData] = useState<ReportEditForm>(form.getValues());
  
  useEffect(() => {
    if (formData) {
      form.reset(formData);
    }
  }, [formData, form]);

  const handleFormChange = (data: ReportEditForm) => {
    const { files, report_date_convert } = data;
    const hasChanged = 
      previousData.files !== files || 
      previousData.report_date_convert !== report_date_convert;
    if (hasChanged) {
      if (report_date_convert) {
        data.report_date = format(new Date(report_date_convert), 'yyyy-MM-dd');
      }

      if (files && files[0]) {
        data.report_evidence = files[0];
      }
    }
    onSubmit(data);
  };

  return (
    <div className="flex p-4 justify-between">
      <Form {...form}>
       <form className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">{addReportForm[0].label}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                    placeholder={addReportForm[0].placeholder || ""}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFormChange(form.getValues());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="report_date_convert"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">{addReportForm[1].label}</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-between font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                        ? format(typeof field.value === "number" ? new Date(field.value) : field.value, "dd MMMM yyyy")
                        : <span>Pick a date</span> }
                        <CalendarIcon className="size-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar 
                        mode='single'
                        selected={typeof field.value === "number" ? new Date(field.value) : field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          handleFormChange(form.getValues());
                        }}
                        footer={
                          field.value
                            ? `Tanggal terpilih: ${format(typeof field.value === "number" ? new Date(field.value) : field.value, 'dd/M/yyyy')}`
                            : "Pick a day."
                        }
                        defaultMonth={typeof field.value === "number" ? new Date(field.value) : field.value || new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="report_categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs dark:text-white">{addReportForm[2].label}</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={(value) => {
                    field.onChange(value);
                    handleFormChange(form.getValues());
                  }}>
                    <SelectTrigger
                      aria-label={`Kategori ${reportString}`}
                      className="bg-background"
                    >
                      <SelectValue placeholder={addReportForm[2].placeholder}/>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item, index) => (
                        <SelectItem value={item.value} key={index}>
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
            name="report_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">{addReportForm[3].label}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                    placeholder={addReportForm[3].placeholder || ""}
                    value={formatCurrency(field.value.toString())} 
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(rawValue);
                      handleFormChange(form.getValues());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs dark:text-white">{addReportForm[4].label}</FormLabel>
                  <FormControl>
                  <div>
                      <div>
                        
                        {!field.value || field.value.length === 0 ? (
                          <>
                          <div
                            className="border-dashed border-2 border-gray-300 bg-background rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              field.onChange(e.dataTransfer.files);
                              handleFormChange(form.getValues());
                            }}
                            onClick={() =>
                              document.getElementById("fileUploadInput")?.click()
                            }
                          >
                            <CloudUpload className="w-12 h-12 mb-2" />
                            <p className="text-sm font-medium text-gray-500">
                              Unggah File
                            </p>
                            <p className="text-xs text-gray-400">
                              Only Support JPG, PNG, JPEG Maximum file
                              size 5MB
                            </p>
                          </div>
                          </>
                        ) : (
                           <div
                            className="bg-background rounded-lg p-4 flex cursor-pointer"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              field.onChange(e.dataTransfer.files);
                              handleFormChange(form.getValues());
                            }}
                            onClick={() =>
                              document.getElementById("fileUploadInput")?.click()
                            }
                          >
                            <File className="w-12 h-12 mb-2" />
                            {Array.from(field.value).map((file: File, index: number) => {
                              return (
                                <div className="flex flex-col ml-2" key={index}>
                                  <span>{file.name}</span>
                                  <span className="text-muted-foreground">
                                    {bytesToMb(file.size)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                       
                        <input
                          id="fileUploadInput"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const uploadedFiles = Array.from(e.target.files || []);
                            field.onChange(uploadedFiles);
                            handleFormChange(form.getValues());
                          }}
                        />
                      </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}