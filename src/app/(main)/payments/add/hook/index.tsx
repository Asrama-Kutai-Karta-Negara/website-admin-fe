import { useState } from 'react';
import { PaymentAddForm } from '@interfaces/data-types';
import { useToast } from '@interfaces/use-toast';
import { createPayment} from '@services/payment';

export function useCreate() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createNewPayment = async (formData: PaymentAddForm, onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await createPayment(formData);
      if (response.status) {
        toast({
          variant: 'success',
          title: 'Success',
          description: `Payment successfully created!`,
        });
        if (onSuccess) onSuccess();
      } else {
        toast({
          variant: 'failed',
          title: 'Error',
          description: response.message || 'An error occurred while creating the gallery.',
        });
      }
    } catch (err) {
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
    createNewPayment,
  };
}
