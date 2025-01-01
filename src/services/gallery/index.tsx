import { GalleryAddForm } from '@interfaces/data-types';
import SatellitePrivate from '@services/satellite/private';

export async function createGallery(formData: GalleryAddForm) {
  try {
    const payload = {
      title: formData.title,
      type: formData.type,
      category_id: formData.category_id,
      file_name: formData.file_name,
      file: formData.file
    };
    console.log(payload);
    const res = await SatellitePrivate.post(
      '/galleries',
      payload
    );

    const response =  res.data;
    return {
      status: response.success,
      message: response.message,
    };
  } catch (error) {
    console.error('Error creating :', error);
    return {
      status: false,
      message: 'An unexpected error occurred.',
    };
  }
}
