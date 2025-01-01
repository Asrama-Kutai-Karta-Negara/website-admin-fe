'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/form';
import { Input } from '@components/input';
import { Categories, formatMessage, GalleryAddForm } from '@interfaces/data-types';
import RadioGroupButton from '@components/radio-group';
import { typeMediaGallery } from '@constant/condition/general';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@components/select';
import { galleryString } from '@constant/breadcrumbs';
import { addGalleryForm } from '@constant/data/gallery';
import SatellitePrivate from '@services/satellite/private';

export default function AddGalleries({ onSubmit }: { onSubmit: (data: GalleryAddForm) => void }) {
  const [categories, setCategories] = useState<Categories[]>([]);

  const form = useForm<GalleryAddForm>({
    defaultValues: {
      title: '',
      type: '',
      category_id: '',
      files: undefined,
      file: '',
      file_name: 'null'
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await SatellitePrivate.get<formatMessage>('/categories');
        const response = res.data;
        const categories : Categories[] = Array.isArray(response.data) ? response.data : [];
        if (response.success === true) {
          setCategories(categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

    const handleFormChange = (data: GalleryAddForm) => {
        if (data.files && data.files[0]) {
            const file = data.files[0];
            data.file_name = file.name;
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64Data = reader.result as string;
                const [mimeType, base64Content] = base64Data.split(',');
                data.file = base64Content;
                onSubmit(data);
            };
            reader.readAsDataURL(file);
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
                <FormLabel className="text-xs dark:text-white">{addGalleryForm[3].label}</FormLabel>
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