'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/button';
import CustomText from '@components/particel/custom-text';
import DynamicCard from '@components/particel/dynamic-card';
import { createTitleAndBreadcrumbs, paymentUrl, paymentString } from '@constant/breadcrumbs';
import Breadcumbs from '@ui/breadcrumbs';
import Link from 'next/link';
import { PaymentEditForm } from '@interfaces/data-types';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '../../hook';
import EditPayments from '@ui/data/payments/edit';

export default function EditPaymentsPage() {
  const router = useRouter();
  const { id } = useParams(); 
  const validId = id && typeof id === 'string' ? id : ''; 
  const { detailPayment, updatePayment } = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<PaymentEditForm>({
    resident_id: '',
    resident_name: '',
    billing_date: '',
    billing_date_convert: new Date(),
    billing_amount: '',
    status: '',
    payment_evidence: new File([], 'file'),
    files: undefined,
  });

  const hasFetched = useRef(false);
  
    useEffect(() => {
      if (hasFetched.current) return;
  
      const fetchPaymentDetails = async () => {
        try {
          const payment = await detailPayment(validId, () => {});
          if (payment) {
            setFormData({
              resident_id: payment.resident_id,
              resident_name: payment.resident_name,
              billing_date: payment.billing_date,
              billing_date_convert: new Date(payment.billing_date.toString()),
              billing_amount: payment.billing_amount,
              status: payment.status,
              payment_evidence:  new File([], 'file'),
              files: payment.file_payment_evidence ? [payment.file_payment_evidence] : []
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchPaymentDetails();
      hasFetched.current = true;
    }, [validId, detailPayment]);
  

  const handleFormSubmit = (data: PaymentEditForm) => {
    setFormData(data);
  };

  const handleSave = async () => {
    await updatePayment(formData, validId, () => {
      router.push('/payments');
    });
  }

  const breadcrumbs = createTitleAndBreadcrumbs(
      paymentString, 
      paymentUrl, 
      formData?.resident_name.toLocaleUpperCase(), 
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
              <CustomText text={`Ubah Data ${paymentString}`} textSize="2xl" />
              <div className="flex flex-row items-center space-x-4">
                <Link href={'/payments'}>
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
          body={<EditPayments formData={formData} onSubmit={handleFormSubmit} />}
        />
      </div>
    </>
  );
}
