import { useState } from 'react';
import { ResidentAddForm, Resident } from '@interfaces/data-types';
import { useToast } from '@interfaces/use-toast';
import { 
  postResident,
  getByIdResident, 
} from '@services/resident';

export function useCreate() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createResident = async (formData: ResidentAddForm, onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await postResident(formData);
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

  const detailResident = async (
    id: string | number, 
    onSuccess?: () => void
  ) : Promise<Resident | null> => {
    setIsLoading(true);

    try {
      const response = await getByIdResident(id);
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

  return {
    isLoading,
    createResident,
    detailResident,
    // updateResident
  };
}