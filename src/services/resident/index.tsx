import { ResidentAddForm } from '@interfaces/data-types';
import SatellitePrivate from '@services/satellite/private';

export async function createResident(formData: ResidentAddForm) {
  try {
    const payload = {
      name: formData.name,
      age: formData.age,
      birth_date: formData.birth_date,
      address: formData.address,
      origin_city: formData.origin_city,
      origin_campus: formData.origin_campus,
      phone_number: formData.phone_number,
      room_number: formData.room_number
    };
    console.log(payload);
    const res = await SatellitePrivate.post(
      '/residents',
      payload
    );

    const response =  res.data;
    return {
      status: response.success,
      message: response.message,
    };
  } catch (error) {
    console.error('Error creating:', error);
    return {
      status: false,
      message: 'An unexpected error occurred.',
    };
  }
}
