'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/button';
import CustomText from '@components/particel/custom-text';
import DynamicCard from '@components/particel/dynamic-card';
import { createTitleAndBreadcrumbs, reportUrl, reportString } from '@constant/breadcrumbs';
import Breadcumbs from '@ui/breadcrumbs';
import Link from 'next/link';
import { ReportEditForm } from '@interfaces/data-types';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '../../hook';
import EditReports from '@ui/data/report/edit';

export default function EditReportPage() {
  const router = useRouter();
  const { id } = useParams(); 
  const validId = id && typeof id === 'string' ? id : ''; 
  const { detailReport, updateReport } = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<ReportEditForm>({
    title: '',
    report_date: '',
    report_date_convert: new Date(),
    report_amount: '',
    report_categories: '',
    report_evidence: new File([], 'file'),
    files: undefined,
  });

  const hasFetched = useRef(false);
  
  useEffect(() => {
    if (hasFetched.current) return;

    const fetchPaymentDetails = async () => {
      try {
        const report = await detailReport(validId, () => {});
        if (report) {
          setFormData({
            title: report.title,
            report_date: report.report_date,
            report_date_convert: new Date(report.report_date.toString()),
            report_amount: report.report_amount,
            report_categories: report.report_categories,
            report_evidence:  new File([], 'file'),
            files: report.file_report_evidence ? [report.file_report_evidence] : []
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
  }, [validId, detailReport]);
  

  const handleFormSubmit = (data: ReportEditForm) => {
    setFormData(data);
  };

  const handleSave = async () => {
    await updateReport(formData, validId, () => {
      router.push('/reports');
    });
  }

  const breadcrumbs = createTitleAndBreadcrumbs(
      reportString, 
      reportUrl, 
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
              <CustomText text={`Ubah Data ${reportString}`} textSize="2xl" />
              <div className="flex flex-row items-center space-x-4">
                <Link href={'/reports'}>
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
          body={<EditReports formData={formData} onSubmit={handleFormSubmit} />}
        />
      </div>
    </>
  );
}
