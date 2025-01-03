import { useState } from 'react';
import { Gallery, GalleryAddForm, GalleryEditForm } from '@interfaces/data-types';
import { useToast } from '@interfaces/use-toast';
import { 
  postGallery, 
  getByIdGallery, 
  putGallery 
} from '@services/gallery';

export function useQueryClient() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createGallery = async (formData: GalleryAddForm, onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await postGallery(formData);
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

  const detailGallery = async (
    id: string | number, 
    onSuccess?: () => void
  ) : Promise<Gallery | null> => {
    setIsLoading(true);

    try {
      const response = await getByIdGallery(id);
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

  const updateGallery = async (formData: GalleryEditForm, id: string | number, onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await putGallery(formData, id);
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
          description: response.message || 'An error occurred while updating the gallery.',
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
    createGallery,
    detailGallery,
    updateGallery
  };
}
