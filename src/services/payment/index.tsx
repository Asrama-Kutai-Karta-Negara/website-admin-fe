import { PaymentAddForm } from '@interfaces/data-types';
import SatellitePrivate from '@services/satellite/private';
import { AxiosError } from 'axios';

export async function postPayment(formData: PaymentAddForm) {
  try {
    const payload = new FormData();
    payload.append("resident_id", formData.resident_id);
    payload.append("billing_date", formData.billing_date);
    payload.append("billing_amount", formData.billing_amount.toString());
    payload.append("payment_evidence", formData.payment_evidence);
    payload.append("status", formData.status);

    const res = await SatellitePrivate.post(
      '/payments', payload ,
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