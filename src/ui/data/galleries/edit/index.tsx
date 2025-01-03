'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/form';
import { Input } from '@components/input';
import { Categories, formatMessage, GalleryEditForm } from '@interfaces/data-types';
import RadioGroupButton from '@components/radio-group';
import { typeMediaGallery } from '@constant/condition/general';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@components/select';
import { galleryString } from '@constant/breadcrumbs';
import { addGalleryForm } from '@constant/data/gallery';
import SatellitePrivate from '@services/satellite/private';
import { CloudUpload, File } from 'lucide-react';
import { bytesToMb } from '@utils/format';
import { Button } from '@components/button';

export default function EditGalleries({
  formData, 
  onSubmit
}: { 
  formData: GalleryEditForm | undefined;
  onSubmit: (data: GalleryEditForm) => void 
}) {
  const [categories, setCategories] = useState<Categories[]>([]);
  const form = useForm<GalleryEditForm>({
    defaultValues: formData || {
      title: '',
      type: '',
      category_id: '',
      file: undefined,
      files: undefined,
      file_name: '',
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await SatellitePrivate.get<formatMessage<Categories[]>>('/categories');
        const response = res.data;
        const categories =  response.data || [];
        if (response.success === true) {
          setCategories(categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData) {
      form.reset(formData);
    }
  }, [formData, form]);

  const handleFormChange = (data: GalleryEditForm) => {
    if (data.files && data.files[0]) {
      data.file = data.files[0];
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
                <FormLabel className="text-xs">{addGalleryForm[0].label}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                    placeholder={addGalleryForm[0].placeholder || ""}
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

          {/* Type Field */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs dark:text-white">{addGalleryForm[1].label}</FormLabel>
                <FormControl>
                  <RadioGroupButton
                    radioButton={typeMediaGallery}
                    defaultValue={field.value}
                    ariaLabel={`Tipe ${galleryString}`}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleFormChange(form.getValues()); 
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs dark:text-white">{addGalleryForm[2].label}</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={(value) => {
                    field.onChange(value);
                    handleFormChange(form.getValues());
                  }}>
                    <SelectTrigger
                      aria-label={`Kategori ${galleryString}`}
                      className="bg-background"
                    >
                      <SelectValue placeholder={addGalleryForm[2].placeholder}/>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item) => (
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

          {/* File Field */}
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs dark:text-white">
                  {addGalleryForm[3].label}
                </FormLabel>
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
                              Only Support JPG, PNG, JPEG, MKV & MP4 Format, Maximum file
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
                            <File className="w-12 h-12 mb-2 md:w-12 md:h-12" />
                            {Array.from(field.value).map((file: File, index: number) => (
                              <div className='flex justify-between items-center w-full' key={index}>
                                <div className='flex flex-col ml-2'>
                                  <span>{file.name}</span>
                                  <span className='text-muted-foreground'>{bytesToMb(file.size)}</span>
                                </div>
                                <Button
                                  variant="outline"
                                  size={null}
                                  className="bg-yellow dark:bg-blonde hover:bg-gold hover:text-blonde dark:text-black dark:hover:text-white border-0 p-2"
                                  onClick={() => {
                                    field.onChange([]);
                                    handleFormChange(form.getValues());
                                  }}
                                >
                                  <span className="ml-1 ">Hapus</span>
                                </Button>
                              </div>
                              ))}
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