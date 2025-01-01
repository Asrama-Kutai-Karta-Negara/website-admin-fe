import { PaymentAddForm } from '@interfaces/data-types';
import SatellitePrivate from '@services/satellite/private';

export async function createPayment(formData: PaymentAddForm) {
  try {
    const payload = {
      resident_id: formData.resident_id,
      billing_date: formData.billing_date,
      billing_amount: formData.billing_amount,
      status: formData.status,
      payment_evidence: formData.payment_evidence,
      payment_file_name: formData.payment_file_name
    };
    console.log(payload);
    const res = await SatellitePrivate.post(
      '/payments',
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
