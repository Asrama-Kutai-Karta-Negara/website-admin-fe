import { useState } from 'react';
import { GalleryAddForm } from '@interfaces/data-types';
import { useToast } from '@interfaces/use-toast';
import { createGallery } from '@services/gallery';

export function useCreate() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createNewGallery = async (formData: GalleryAddForm, onSuccess?: () => void) => {
    setIsLoading(true);

    try {
      const response = await createGallery(formData);
      if (response.status) {
        toast({
          variant: 'success',
          title: 'Success',
          description: `Gallery ${formData.title} successfully created!`,
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
    createNewGallery,
  };
}
