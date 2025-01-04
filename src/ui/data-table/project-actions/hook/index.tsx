import { useState } from 'react';
import { useToast } from '@interfaces/use-toast';
import { galleryUrl, paymentUrl, residentUrl } from '@constant/breadcrumbs';
import { deleteResident } from '@services/resident';
import { deleteGallery } from '@services/gallery';
import { deletePayment } from '@services/payment';

export function useQueryClient() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const deleteQuery = async (
    id: string | number, 
    path: string,
    onSuccess?: () => void
  ) => {
    setIsLoading(true);

    try {
      let response = {
        status: false,
        message: "loading delete..."
      };
      if(path === residentUrl){
        response = await deleteResident(id);
      }else if(path === galleryUrl){
        response = await deleteGallery(id);
      }else if(path === paymentUrl){
        response = await deletePayment(id);
      }
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
          description: response.message || 'An error occurred while creating the gallery.',
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
    deleteQuery
  };
}
