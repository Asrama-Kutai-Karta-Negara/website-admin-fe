'use client';

import { useState } from 'react';
import { Button } from '@components/button';
import CustomText from '@components/particel/custom-text';
import DynamicCard from '@components/particel/dynamic-card';
import { createTitleAndBreadcrumbs, galleryString, galleryUrl } from '@constant/breadcrumbs';
import Breadcumbs from '@ui/breadcrumbs';
import AddGalleries from '@ui/data/galleries/add';
import Link from 'next/link';
import { GalleryAddForm } from '@interfaces/data-types';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '../hook';

export default function AddGalleriesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<GalleryAddForm>({
    title: '',
    type: '',
    category_id: '',
    file: new File([], 'file'),
    files: undefined,
  });
  const { isLoading, createGallery } = useQueryClient();

  const handleFormSubmit = (data: GalleryAddForm) => {
    setFormData(data);
  };

  const handleSave = async () => {

    await createGallery(formData, () => {
      router.push('/galleries');
    });
  }
  const breadcrumbs = createTitleAndBreadcrumbs(galleryString, galleryUrl);

  return (
    <>
      <div className="container max-w-screen-xl mx-auto px-4">
        <Breadcumbs title={breadcrumbs.addTitle} breadCrumbs={breadcrumbs.breadcrumbsAdd} />
        <DynamicCard
          border={true}
          header={
            <div className="flex p-4 justify-between items-center">
              <CustomText text={`Tambah ${galleryString} Baru`} textSize="2xl" />
              <div className="flex flex-row items-center space-x-4">
                <Link href={'/galleries'}>
                  <Button
                    variant="outline"
                    size={null}
                    className="bg-primary p-2 rounded border"
                  >
                    <span className="ml-1 ">Batal</span>
                  </Button>
                </Link>
                <Button
                  onClick={handleSave}
                  variant="outline"
                  size={null}
                  className="bg-yellow dark:bg-blonde hover:bg-gold hover:text-blonde dark:text-black dark:hover:text-white border-0 p-2"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-4 w-4 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Memproses...
                    </span>
                  ) : (
                    <span className="ml-1 ">Tambah {galleryString}</span>
                  )}
                </Button>
              </div>
            </div>
          }
          body={<AddGalleries onSubmit={handleFormSubmit} />}
        />
      </div>
    </>
  );
}
