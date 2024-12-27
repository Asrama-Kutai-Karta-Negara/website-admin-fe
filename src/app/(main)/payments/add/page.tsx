'use client';

import { useState } from 'react';
import { Button } from '@components/button';
import CustomText from '@components/particel/custom-text';
import DynamicCard from '@components/particel/dynamic-card';
import { breadCrumbsPaymentsAdd, paymentsAddTitle, paymentString } from '@constant/breadcrumbs';
import Breadcumbs from '@ui/breadcrumbs';
import AddPayments from '@ui/data/payments/add';
import Link from 'next/link';
import { ResidentsAdd } from '@interfaces/data-types';

export default function AddPaymentsPage() {
  const [formData, setFormData] = useState<ResidentsAdd | null>(null);

  const handleFormSubmit = (data: ResidentsAdd) => {
    setFormData(data);
  };

  const handleSave = async () => {
    if (!formData) {
      return;
    }
    
    console.log("Data to save:", formData);
  };

  return (
    <>
      <div className="container max-w-screen-xl mx-auto px-4">
        <Breadcumbs title={paymentsAddTitle} breadCrumbs={breadCrumbsPaymentsAdd} />
        <DynamicCard
          border={true}
          header={
            <div className="flex p-4 justify-between items-center">
              <CustomText text={`Tambah ${paymentString} Baru`} textSize="2xl" />
              <div className="flex flex-row items-center space-x-4">
                <Link href={'/payments'}>
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
                  <span className="ml-1 ">Tambah {paymentString}</span>
                </Button>
              </div>
            </div>
          }
          body={<AddPayments onSubmit={handleFormSubmit} />}
        />
      </div>
    </>
  );
}
