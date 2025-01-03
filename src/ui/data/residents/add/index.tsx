
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/form';
import { Input } from '@components/input';
import { formatMessage, OriginCampus, ResidentAddForm, RoomNumbers } from '@interfaces/data-types';
import { useToast } from '@interfaces/use-toast';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@components/select';
import { addResidentForm } from '@constant/data/resident';
import { Textarea } from '@components/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@components/popover';
import { Button } from '@components/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@components/calendar';
import { useEffect, useState } from 'react';
import { cn } from '@lib/utils'
import SatellitePrivate from '@services/satellite/private';

export default function AddResidents({ onSubmit }: { onSubmit: (data: ResidentAddForm) => void }) {
  const { toast } = useToast();

  const [originCampuses, setOriginCampuses] = useState<OriginCampus[]>([]);
  const [roomNumbers, setRoomNumbers] = useState<RoomNumbers[]>([]);

  const form = useForm<ResidentAddForm>({
    defaultValues: {
      name: '',
      age: '',
      birth_date: '',
      birth_date_convert: undefined,
      phone_number: '',
      origin_campus_id: '',
      room_number_id: '',
      address: '',
      origin_city: '',
      status: 'active',
    },
  });

  useEffect(() => {
    const fetchOriginCampus = async () => {
      try {
        const res = await SatellitePrivate.get<formatMessage<OriginCampus[]>>('/origin-campuses');
        const response = res.data;
        const originCampuses =  response.data || [];
        if (response.success === true) {
          setOriginCampuses(originCampuses);
        }
      } catch (error) {
        console.error('Error fetching origin campuses:', error);
      }
    };

    const fetchRoomNumbers = async () => {
      try {
        const res = await SatellitePrivate.get<formatMessage<RoomNumbers[]>>('/room-numbers');
        const response = res.data;
        const roomNumbers =  response.data || [];
        if (response.success === true) {
          setRoomNumbers(roomNumbers);
        }
      } catch (error) {
        console.error('Error fetching room numbers:', error);
      }
    };

    fetchOriginCampus();
    fetchRoomNumbers();
  }, []);
  
  const [previousData, setPreviousData] = useState<ResidentAddForm>(form.getValues());

  const handleFormChange = (data: ResidentAddForm) => {
    const { phone_number, age, birth_date_convert, address } = data;
    const hasChanged = 
      previousData.age !== age ||
      previousData.phone_number !== phone_number ||
      previousData.birth_date_convert !== birth_date_convert ||
      previousData.address !== address;
    let success = true;
    
    if (hasChanged) {
      if(phone_number.length < 15 ){
        if(phone_number.length > 2  && phone_number.length < 15 ){
          if(!phone_number.includes("62")){
            toast({
              variant: 'warning',
              title: 'Nomor Telepon',
              description: 'Harap menggunakan nomor telepon yang benar (diawali dengan 62)!',
            });
          }
        }
      }else{
        toast({
          variant: 'warning',
          title: 'Nomor Telepon',
          description: 'Maksimal nomor telepon 13 digit! 62 dihitung 1 digit',
        });
      }

      if (age && Number.isNaN(parseInt(age.toString(), 10))) {
        toast({
          variant: 'warning',
          title: 'Umur',
          description: 'Harap menggunakan angka untuk umur!',
        });
        success = false;
      }else{
        data.age = parseInt(age.toString(), 10);
      }

      if (birth_date_convert) {
        data.birth_date = format(new Date(birth_date_convert), 'yyyy-MM-dd');
      }

      if (address !== null && address !== data.address) {
        if(address.includes(',')){
          const lastCommaIndex = address.lastIndexOf(',');
          data.address = address.slice(0, lastCommaIndex).trim(); 
          data.origin_city = address.slice(lastCommaIndex + 1).trim(); 
        } else {
          toast({
            variant: 'warning',
            title: 'Alamat',
            description: 'Alamat harus memiliki format yang benar dengan koma (,) untuk memisahkan kota asal!',
          });
          success = false;
        }
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
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addResidentForm[0].label}</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                        placeholder={addResidentForm[0].placeholder || ""}
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
              {/* Age Field */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addResidentForm[1].label}</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                        placeholder={addResidentForm[1].placeholder || ""}
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
          </div>

          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className="md:w-1/2">
              {/* Birth Date Field */}
              <FormField
                control={form.control}
                name="birth_date_convert"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addResidentForm[2].label}</FormLabel>
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
                            disabled={(date) => date > new Date()}
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
            <div className="md:w-1/2">
              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addResidentForm[3].label}</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                        placeholder={addResidentForm[3].placeholder || ""}
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
          </div>

          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className="md:w-1/2">
              {/* Origin Campus Field */}
              <FormField
                control={form.control}
                name="origin_campus_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addResidentForm[4].label}</FormLabel>
                    <FormControl>
                      <Select 
                        value={field.value} 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleFormChange(form.getValues());
                        }}
                      >
                        <SelectTrigger
                          aria-label={`Origin Campus`}
                          className="bg-background"
                        >
                          <SelectValue placeholder={addResidentForm[4].placeholder}/>
                        </SelectTrigger>
                        <SelectContent>
                          {originCampuses.map((item, index) => (
                            <SelectItem value={item.id} key={index}>
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
              {/* Room Number Field */}
              <FormField
                control={form.control}
                name="room_number_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">{addResidentForm[5].label}</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={(value) => {
                        field.onChange(value);
                        handleFormChange(form.getValues());
                      }}>
                        <SelectTrigger
                          aria-label={`Room Number`}
                          className="bg-background"
                        >
                          <SelectValue placeholder={addResidentForm[5].placeholder}/>
                        </SelectTrigger>
                        <SelectContent>
                          {roomNumbers.map((item, index) => (
                            <SelectItem value={item.id} key={index}>
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">{addResidentForm[6].label}</FormLabel>
                <FormControl>
                   <Textarea
                    className="bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                    placeholder={addResidentForm[6].placeholder || ""}
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
        </form>
      </Form>
    </div>
  );
}