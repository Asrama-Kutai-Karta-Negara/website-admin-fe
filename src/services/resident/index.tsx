import { formatMessage, ResidentAddForm, Resident, ResidentEditForm } from '@interfaces/data-types';
import SatellitePrivate from '@services/satellite/private';
import { AxiosError } from 'axios';

export async function postResident(formData: ResidentAddForm) {
  try {
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("age", formData.age.toString());
    payload.append("birth_date", formData.birth_date);
    payload.append("address", formData.address);
    payload.append("origin_city_id", formData.origin_city_id);
    payload.append("origin_campus_id", formData.origin_campus_id);
    payload.append("phone_number", formData.phone_number);
    payload.append("room_number_id", formData.room_number_id);
    payload.append("status", 'active');

    const res = await SatellitePrivate.post<formatMessage<Resident>>(
      '/residents', payload ,
      {
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      }
    );
    const response =  res.data;
    return {
      status: response.success,
      message: response.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'An error occurred.';
      return {
        status: false,
        message: message || 'Unexpected server error.',
      };
    } else {
      console.error('Unexpected error:', error);
      return {
        status: false,
        message: 'An unexpected error occurred.',
      };
    }
  }
}

export async function getByIdResident(id: string | number): Promise<formatMessage<Resident>> {
  try {
    const res = await SatellitePrivate.get<formatMessage<Resident>>(`/residents/${id}`);
    const response = res.data;

    if (response.success && response.data) {
      return response;
    }

    return response;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return {
      success: false,
      message: 'An unexpected error occurred.',
      data: null,
    };
  }
}

export async function putResident(formData: ResidentEditForm, id: string | number) {
  try {
    const payload = {
      name: formData.name,
      age: formData.age,
      birth_date: formData.birth_date,
      phone_number: formData.phone_number,
      origin_campus_id: formData.origin_campus_id,
      room_number_id: formData.room_number_id,
      address: formData.address,
      origin_city_id: formData.origin_city_id,
      status: formData.status
    }

    const res = await SatellitePrivate.put<formatMessage<Resident>>(
      `/residents/${id}`, payload,
    );
    const response =  res.data;
    return {
      status: response.success,
      message: response.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'An error occurred.';
      return {
        status: false,
        message: message || 'Unexpected server error.',
      };
    } else {
      console.error('Unexpected error:', error);
      return {
        status: false,
        message: 'An unexpected error occurred.',
      };
    }
  }
}

export async function deleteResident(id: string | number) {
  try {
    const res = await SatellitePrivate.delete<formatMessage<null>>(
      `/residents/${id}`
    );
    const response =  res.data;
    return {
      status: response.success,
      message: response.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'An error occurred.';
      return {
        status: false,
        message: message || 'Unexpected server error.',
      };
    } else {
      console.error('Unexpected error:', error);
      return {
        status: false,
        message: 'An unexpected error occurred.',
      };
    }
  }
}