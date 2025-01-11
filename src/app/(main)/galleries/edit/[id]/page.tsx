'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/button';
import CustomText from '@components/particel/custom-text';
import DynamicCard from '@components/particel/dynamic-card';
import { createTitleAndBreadcrumbs, galleryString, galleryUrl } from '@constant/breadcrumbs';
import Breadcumbs from '@ui/breadcrumbs';
import Link from 'next/link';
import { GalleryEditForm } from '@interfaces/data-types';
import { useQueryClient } from '../../hook';
import { useParams, useRouter } from 'next/navigation'; 
import EditGalleries from '@ui/data/galleries/edit';

export default function EditGalleriesPage() {
  const router = useRouter(); 
  const { id } = useParams(); 
  const validId = id && typeof id === 'string' ? id : ''; 
  const { detailGallery, updateGallery } = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<GalleryEditForm>({
    title: '',
    type: '',
    category_id: '',
    file: new File([], 'file'),
    files: undefined,
    file_name: '',
    url:''
  });

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const fetchGalleryDetails = async () => {
      try {
        const gallery = await detailGallery(validId, () => {});
        if (gallery) {
          setFormData({
            title: gallery.title,
            type: gallery.type,
            file:  new File([], 'file'),
            files: gallery.file_gallery ? [gallery.file_gallery] : [],
            category_id: gallery.category_id,
            file_name: gallery.file_name,
            url: gallery.url || ''
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryDetails();
    hasFetched.current = true;
  }, [validId, detailGallery]);

  const handleFormSubmit = (data: GalleryEditForm) => {
    setFormData(data);
  };

  const handleSave = async () => {
    await updateGallery(formData, validId, () => {
      router.push('/galleries');
    });
  }
  
  const breadcrumbs = createTitleAndBreadcrumbs(
    galleryString, 
    galleryUrl, 
    formData?.title.toLocaleUpperCase(), 
    validId
  );
  return (
    <>
      <div className="container max-w-screen-xl mx-auto px-4">
        <Breadcumbs title={breadcrumbs.editTitle} breadCrumbs={breadcrumbs.breadcrumbsEdit} />
        <DynamicCard
          border={true}
          header={
            <div className="flex p-4 justify-between items-center">
              <CustomText text={`Ubah Data ${galleryString}`} textSize="2xl" />
              <div className="flex flex-row items-center space-x-4">
                <Link href={'/galleries'}>
                  <Button
                    variant="outline"
                    size={null}
                    disabled={isLoading}
                    className="bg-primary p-2 rounded border"
                  >
                    <span className="ml-1 ">Batal</span>
                  </Button>
                </Link>
                <Button
                  onClick={handleSave}
                  variant="outline"
                  size={null}
                  disabled={isLoading}
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
                    <span className="ml-1 ">Simpan Perubahan</span>
                  )}
                </Button>
              </div>
            </div>
          }
          body={<EditGalleries formData={formData} onSubmit={handleFormSubmit} />}
        />
      </div>
    </>
  );
}
