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
import { FileValidationResult } from '@interfaces/interface-items';
import { validateFileImage } from '@utils/fileValidation';
import { useToast } from '@interfaces/use-toast';
import { Textarea } from '@components/textarea';

export default function EditGalleries({
  formData, 
  onSubmit
}: { 
  formData: GalleryEditForm | undefined;
  onSubmit: (data: GalleryEditForm) => void 
}) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Categories[]>([]);
  const form = useForm<GalleryEditForm>({
    defaultValues: formData || {
      title: '',
      type: '',
      category_id: '',
      file: undefined,
      files: undefined,
      file_name: '',
      url: ''
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

  const [previousData, setPreviousData] = useState<GalleryEditForm>(form.getValues());

  const handleFormChange = (data: GalleryEditForm) => {
    const { type, files, url } = data;
    const hasChanged = previousData.files !== files || previousData.url !== url;
    let success = true;
    
    if (hasChanged) {
      if (files && files[0]) {
        const validation: FileValidationResult = validateFileImage(files[0]);
        if (!validation.isValid) {
          toast({
            variant: 'failed',
            title: 'Error',
            description: validation.errorMessage,
          });
          success = false;
        }else{
          data.file = files[0];
        }
      }
    
      if (url.length > 4){
        console.log("url:",url.length);
        if (type === 'Video') {
          if (url && !url.startsWith('http')) {
            toast({
              variant: 'failed',
              title: 'Error',
              description: 'URL Video harus dimulai dengan "http" atau "https".',
            });
            success = false;
          }
        }
      }
    }
    if (success) {
      onSubmit(data);
    }
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
                <FormLabel className="text-xs dark:text-white">{addGalleryForm[1].label} - (disbaled)</FormLabel>
                <FormControl>
                  <RadioGroupButton
                    radioButton={typeMediaGallery}
                    defaultValue={field.value}
                    ariaLabel={`Tipe ${galleryString}`}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleFormChange(form.getValues()); 
                    }}
                    disabled={true}
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
                {form.getValues().type === 'Foto' ? (
                  <>
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
                                const files = e.dataTransfer.files;
                                if (validateFileTypeImage(files)) {
                                  field.onChange(files);
                                  handleFormChange(form.getValues());
                                } else {
                                  toast({
                                    variant: 'failed',
                                    title: 'Error',
                                    description: 'Hanya file dengan tipe JPG, PNG, atau JPEG yang diperbolehkan.',
                                  });
                                }
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
                                Only Support JPG, PNG, JPEG, Maximum file
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
                              const files = e.dataTransfer.files;
                              if (validateFileTypeImage(files)) {
                                field.onChange(files);
                                handleFormChange(form.getValues());
                              } else {
                                toast({
                                  variant: 'failed',
                                  title: 'Error',
                                  description: 'Hanya file dengan tipe JPG, PNG, atau JPEG yang diperbolehkan.',
                                });
                              }
                            }}
                            onClick={() =>
                              document.getElementById("fileUploadInput")?.click()
                            }
                          >
                            <File className="w-12 h-12 mb-2 md:w-12 md:h-12" />
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
                          accept="image/jpeg, image/png, image/jpg"
                          onChange={(e) => {
                            const uploadedFiles = e.target.files;
                            if (uploadedFiles && validateFileTypeImage(uploadedFiles)) {
                              field.onChange(uploadedFiles);
                              handleFormChange(form.getValues());
                            } else {
                              toast({
                                variant: 'failed',
                                title: 'Error',
                                description: 'Hanya file dengan tipe JPG, PNG, atau JPEG yang diperbolehkan.',
                              });
                            }
                          }}
                        />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </>
                ) : (
                  null
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                  {form.getValues().type === 'Video' ? (
                    <>
                      <FormLabel className="text-xs dark:text-white">
                        Masukkan URL Video
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                          placeholder={"Masukkan URL Video"}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange(form.getValues());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  ) : (
                    null
                  )}
              </FormItem>
            )}
          />

        </form>
      </Form>
    </div>
  );
}