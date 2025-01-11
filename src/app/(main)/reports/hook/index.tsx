import { useState } from 'react';
import { useToast } from '@interfaces/use-toast';
import { putSyncPayment, postReport, getByIdReport, putReport, postExportReport } from '@services/report';
import { ExportReportForm, Report, ReportAddForm, ReportEditForm } from '@interfaces/data-types';

export function useQueryClient() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const syncPayment = async (onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await putSyncPayment();
      if (response.success) {
        toast({
          variant: 'success',
          title: 'Success',
          description: response.message,
        });
        if (onSuccess) onSuccess();
      } else {
        console.error(response);
        toast({
          variant: 'failed',
          title: 'Error',
          description: response.message || 'An error occurred while creating the resident.',
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: 'failed',
        title: 'Error',
        description: 'Something went wrong, please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createReport = async (formData: ReportAddForm, onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await postReport(formData);
      if (response.status) {
        toast({
          variant: 'success',
          title: 'Success',
          description: response.message,
        });
        if (onSuccess) onSuccess();
      } else {
        console.error(response);
        toast({
          variant: 'failed',
          title: 'Error',
          description: response.message || 'An error occurred while creating the resident.',
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: 'failed',
        title: 'Error',
        description: 'Something went wrong, please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const detailReport = async (
   id: string | number, 
    onSuccess?: () => void
  ) : Promise<Report | null> => {
    setIsLoading(true);

    try {
      const response = await getByIdReport(id);
      if (response?.success && response.data) {
        if (onSuccess) onSuccess();
        return response.data;
      } else {
        return null; 
      }
    } catch (err) {
      console.error(err);
      return null; 
    } finally {
      setIsLoading(false);
    }
  };

  const updateReport = async (formData: ReportEditForm, id: string | number, onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await putReport(formData, id);
      if (response.status) {
        toast({
          variant: 'success',
          title: 'Success',
          description: response.message,
        });
        if (onSuccess) onSuccess();
      } else {
        console.error(response);
        toast({
          variant: 'failed',
          title: 'Error',
          description: response.message || 'An error occurred while updating the payment.',
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: 'failed',
        title: 'Error',
        description: 'Something went wrong, please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportReport = async (formData: ExportReportForm, onSuccess?: () => void): Promise<{ status: boolean, message: string }> => {
    setIsLoading(true);
    try {
      const response = await postExportReport(formData);
      if (response.status) {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Berhasil mengexport laporan.',
        });
        if (onSuccess) onSuccess();
        return { status: true, message: 'Export successful' };
      } else {
        console.error(response);
        toast({
          variant: 'failed',
          title: 'Error',
          description: response.message || 'An error occurred while exporting the report.',
        });
        return { status: false, message: response.message || 'Export failed' };
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: 'failed',
        title: 'Error',
        description: 'Something went wrong, please try again.',
      });
      return { status: false, message: 'An unexpected error occurred.' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    syncPayment,
    createReport,
    detailReport,
    updateReport,
    exportReport
  };
}
