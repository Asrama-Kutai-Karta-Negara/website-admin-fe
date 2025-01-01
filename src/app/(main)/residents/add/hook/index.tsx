import { useState } from 'react';
import { ResidentAddForm } from '@interfaces/data-types';
import { useToast } from '@interfaces/use-toast';
import { createResident } from '@services/resident';

export function useCreate() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createNewResident = async (formData: ResidentAddForm, onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await createResident(formData);
      console.log("response - createNewGallery : ", response);
      if (response.status) {
        toast({
          variant: 'success',
          title: 'Success',
          description: `Resident ${formData.name} successfully created!`,
        });
        if (onSuccess) onSuccess();
      } else {
        toast({
          variant: 'failed',
          title: 'Error',
          description: response.message || 'An error occurred while creating the resident.',
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
    createNewResident,
  };
}
