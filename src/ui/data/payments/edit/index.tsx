
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/form';
import { Input } from '@components/input';
import { formatMessage, PaymentEditForm, ResidentSelect } from '@interfaces/data-types';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@components/select';
import { statusPaymentGallery } from '@constant/condition/general';
import { Popover, PopoverContent, PopoverTrigger } from '@components/popover';
import { Button } from '@components/button';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { addPaymentForm } from '@constant/data/payment';
import SatellitePrivate from '@services/satellite/private';
import { Calendar as CalendarIcon } from "@mynaui/icons-react";
import { Calendar } from "@components/calendar";
import { cn } from "@/lib/utils";
import { bytesToMb, formatCurrency } from '@utils/format';
import { CloudUpload, File } from 'lucide-react';

export default function EditPayments({ 
  formData,
  onSubmit 
}: { 
  formData: PaymentEditForm | undefined;
  onSubmit: (data: PaymentEditForm) => void 
}) {
  const [residents, setResidents] = useState<ResidentSelect[]>([]);

  const form = useForm<PaymentEditForm>({
    defaultValues: formData || {
      resident_id: '',
      billing_date: '',
      billing_date_convert: undefined,
      billing_amount: '',
      status: '',
      payment_evidence: undefined,
      files: undefined
    },
  });

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const res = await SatellitePrivate.get<formatMessage<ResidentSelect[]>>(
          '/get-residents-index',{
            params: {
              sort_by: 'name',
            }
          }
        );
        const response = res.data;
        const residents = response.data || [];
        if (response.success === true) {
          setResidents(residents);
        }
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, []);

  const [previousData, setPreviousData] = useState<PaymentEditForm>(form.getValues());
  
  useEffect(() => {
    if (formData) {
      form.reset(formData);
    }
  }, [formData, form]);

  const handleFormChange = (data: PaymentEditForm) => {
    const { files, billing_date_convert } = data;
    const hasChanged = 
      previousData.files !== files || 
      previousData.billing_date_convert !== billing_date_convert;
    if (hasChanged) {
      if (files && files[0]) {
        data.payment_evidence = files[0];
      }

      if (billing_date_convert) {
        data.billing_date = format(new Date(billing_date_convert), 'yyyy-MM-dd');
      }
    }
    onSubmit(data);
  };

  return (
    <div className="flex p-4 justify-between">
      <Form {...form}>
        <form className="space-y-4  w-full">
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className="md:w-1/2">
              {/* Resident Id Field */}
              <FormField
                control={form.control}
                name="resident_id"
                disabled={true}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addPaymentForm[0].label}</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={(value) => {
                        field.onChange(value);
                        handleFormChange(form.getValues());
                      }} disabled>
                        <SelectTrigger
                          aria-label={`Residents Select`}
                          className="bg-background"
                        >
                          <SelectValue placeholder={addPaymentForm[0].placeholder}/>
                        </SelectTrigger>
                        <SelectContent>
                          {residents.map((item) => (
                            <SelectItem value={item.id} key={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:w-1/2">
              {/* Billing Date Field */}
              <FormField
                control={form.control}
                name="billing_date_convert"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addPaymentForm[1].label}</FormLabel>
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
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className="md:w-1/2">
              {/* Billing Amount Field */}
              <FormField
                control={form.control}
                name="billing_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addPaymentForm[2].label}</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                        placeholder={addPaymentForm[2].placeholder || ""}
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
            </div>
            <div className="md:w-1/2">
              {/* Status Field */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addPaymentForm[3].label}</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={(value) => {
                        field.onChange(value);
                        handleFormChange(form.getValues());
                      }}>
                        <SelectTrigger
                          aria-label={`Status Select`}
                          className="bg-background"
                        >
                          <SelectValue placeholder={addPaymentForm[3].placeholder}/>
                        </SelectTrigger>
                        <SelectContent>
                          {statusPaymentGallery.map((item, index) => (
                            <SelectItem value={item.value} key={index}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Evidence Field */}
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs dark:text-white">{addPaymentForm[4].label}</FormLabel>
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