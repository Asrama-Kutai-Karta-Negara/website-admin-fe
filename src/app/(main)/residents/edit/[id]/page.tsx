'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/button';
import CustomText from '@components/particel/custom-text';
import DynamicCard from '@components/particel/dynamic-card';
import { createTitleAndBreadcrumbs, residentString, residentUrl } from '@constant/breadcrumbs';
import Breadcumbs from '@ui/breadcrumbs';
import Link from 'next/link';
import { ResidentEditForm } from '@interfaces/data-types';
import { useParams, useRouter } from 'next/navigation'; 
import EditResidents from '@ui/data/residents/edit';
import { useQueryClient } from '../../hook';

export default function EditResidentsPage() {
  const router = useRouter(); 
  const { id } = useParams(); 
  const validId = id && typeof id === 'string' ? id : ''; 
  const { detailResident, updateResident } = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<ResidentEditForm>({
    name: '',
    age: '',
    birth_date: '',
    birth_date_convert: new Date(),
    phone_number: '',
    origin_campus_id: '',
    room_number_id: '',
    address: '',
    origin_city: '',
    status: ''
  });

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const fetchResidentDetails = async () => {
      try {
        const resident = await detailResident(validId, () => {});
        if (resident) {
          setFormData({
            name: resident.name,
            age: resident.age,
            birth_date: resident.birth_date,
            birth_date_convert: new Date(resident.birth_date.toString()),
            phone_number: resident.phone_number,
            origin_campus_id: resident.origin_campus_id,
            room_number_id: resident.room_number_id,
            address: resident.address,
            origin_city: resident.origin_city,
            status: resident.status
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResidentDetails();
    hasFetched.current = true;
  }, [validId, detailResident]);

  const handleFormSubmit = (data: ResidentEditForm) => {
    setFormData(data);
  };

  const handleSave = async () => {
    console.log(formData);
    await updateResident(formData, validId, () => {
      router.push('/residents');
    });
  }
  
  const breadcrumbs = createTitleAndBreadcrumbs(
    residentString, 
    residentUrl, 
    formData?.name.toUpperCase(), 
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
              <CustomText text={`Ubah Data ${residentString}`} textSize="2xl" />
              <div className="flex flex-row items-center space-x-4">
                <Link href={'/residents'}>
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
                    <span className="ml-1 ">Simpan Perubahan</span>
                  )}
                </Button>
              </div>
            </div>
          }
          body={<EditResidents formData={formData} onSubmit={handleFormSubmit} />}
        />
      </div>
    </>
  );
}
