import { useState } from 'react';
import { PaymentAddForm } from '@interfaces/data-types';
import { useToast } from '@interfaces/use-toast';
import { 
  postPayment
} from '@services/payment';

export function useCreate() {
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

  return {
    isLoading,
    createPayment,
  };
}
