'use client';

import { useState } from 'react';
import { Button } from '@components/button';
import CustomText from '@components/particel/custom-text';
import DynamicCard from '@components/particel/dynamic-card';
import { createTitleAndBreadcrumbs, residentUrl, residentString } from '@constant/breadcrumbs';
import Breadcumbs from '@ui/breadcrumbs';
import AddResidents from '@ui/data/residents/add';
import Link from 'next/link';
import { ResidentAddForm } from '@interfaces/data-types';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '../hook';

export default function AddResidentsPage() {
  const router = useRouter(); 
  const [formData, setFormData] = useState<ResidentAddForm>({
    name: '',
    age: '',
    birth_date_convert: new Date(),
    birth_date: '',
    phone_number: '',
    origin_campus_id:'',
    room_number_id: '',
    address: '',
    origin_city_id: '',
    status: '',
  });
    const { isLoading, createResident } = useQueryClient();

  const handleFormSubmit = (data: ResidentAddForm) => {
    setFormData(data);
  };

  const handleSave = async () => {

    await createResident(formData, () => {
      router.push('/residents');
    });
  }

  const breadcrumbs = createTitleAndBreadcrumbs(residentString, residentUrl);
  return (
    <>
      <div className="container max-w-screen-xl mx-auto px-4">
        <Breadcumbs title={breadcrumbs.addTitle} breadCrumbs={breadcrumbs.breadcrumbsAdd} />
        <DynamicCard
          border={true}
          header={
            <div className="flex p-4 justify-between items-center">
              <CustomText text={`Tambah ${residentString} Baru`} textSize="2xl" />
              <div className="flex flex-row items-center space-x-4">
                <Link href={'/residents'}>
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
                    <span className="ml-1 ">Tambah {residentString}</span>
                  )}
                </Button>
              </div>
            </div>
          }
          body={<AddResidents onSubmit={handleFormSubmit} />}
        />
      </div>
    </>
  );
}
