import { useState } from 'react';
import { PaymentAddForm, Payment, PaymentEditForm } from '@interfaces/data-types';
import { useToast } from '@interfaces/use-toast';
import { 
  postPayment,
  getByIdPayment,
  putPayment
} from '@services/payment';

export function useQueryClient() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createPayment = async (formData: PaymentAddForm, onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await postPayment(formData);
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
          description: response.message || 'An error occurred while creating the payment.',
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

  const detailPayment = async (
    id: string | number, 
    onSuccess?: () => void
  ) : Promise<Payment | null> => {
    setIsLoading(true);

    try {
      const response = await getByIdPayment(id);
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

  const updatePayment = async (formData: PaymentEditForm, id: string | number, onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await putPayment(formData, id);
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

  return {
    isLoading,
    createPayment,
    detailPayment,
    updatePayment,
  };
}
