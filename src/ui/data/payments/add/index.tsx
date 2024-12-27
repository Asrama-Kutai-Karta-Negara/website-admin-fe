
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/form';
import { Input } from '@components/input';
import { MessageResponse, PaymentsAdd, Residents } from '@interfaces/data-types';
import { useToast } from '@interfaces/use-toast';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@components/select';
import { statusPaymentGallery } from '@constant/condition/general';
import { Popover, PopoverContent, PopoverTrigger } from '@components/popover';
import { Button } from '@components/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@components/date-picker';
import { useEffect, useState } from 'react';
import { addPaymentForm } from '@constant/data/payment';

export default function AddPayments({ onSubmit }: { onSubmit: (data: PaymentsAdd) => void }) {
  const { toast } = useToast();
  const [residents, setResidents] = useState<Residents[]>([]);

  const form = useForm<PaymentsAdd>({
    defaultValues: {
      resident_id: '',
      billing_date: undefined,
      billing_amount: '',
      status: '',
      files: undefined,
      payment_evidence: '',
      payment_file_name: ''
    },
  });

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/v1/residents');
        const response : MessageResponse = await res.json();
        if (response.success === true) {
          const residents = response.data as Residents[];
          setResidents(residents);
        }
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, []);

  const [previousData, setPreviousData] = useState<PaymentsAdd>(form.getValues());

  const handleFormChange = (data: PaymentsAdd) => {
    const { files } = data;
    const hasChanged = previousData.files !== files;
    let success = true;
    
    if (hasChanged) {
      if (data.files && data.files[0]) {
          const file = data.files[0];
          data.payment_file_name = file.name;
          const reader = new FileReader();

          reader.onloadend = () => {
              const base64Data = reader.result as string;
              const [mimeType, base64Content] = base64Data.split(',');
              data.payment_file_name = base64Content;
              success = true;
          };
          reader.readAsDataURL(file);
      }
    }
    if(success){
      onSubmit(data);
    }
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addPaymentForm[0].label}</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={(value) => {
                        field.onChange(value);
                        handleFormChange(form.getValues());
                      }}>
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
                name="billing_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addPaymentForm[1].label}</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={'flex items-center justify-between bg-background w-full font-normal'}
                            >
                              {field.value ? (
                                format(field.value, 'dd/M/yyyy')
                              ) : (
                                <span className='text-muted-foreground'>dd/mm/yyyy</span>
                              )}
                              <CalendarIcon className='ml-2 h-4 w-4 justify-items-end' />
                              
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={
                                (date) => {
                                  field.onChange(date);
                                  handleFormChange(form.getValues());
                                }
                              }
                              disabled={(date) =>
                                date > new Date()
                              }
                              
                              footer={
                                  field.value ? `Tanggal terpilih: ${format(field.value, 'dd/M/yyyy')}` : "Pick a day."
                              }
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

          {/* Origin City Field */}
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs dark:text-white">{addPaymentForm[4].label}</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className="bg-yellow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Upload File"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      handleFormChange(form.getValues()); 
                    }}
                  />
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