import { formatMessage, Payment, PaymentAddForm, PaymentEditForm } from '@interfaces/data-types';
import SatellitePrivate from '@services/satellite/private';
import { AxiosError } from 'axios';

export async function postPayment(formData: PaymentAddForm) {
  try {
    let payload;
    let contentType = 'application/json';
    if(formData.payment_evidence !== undefined){
      payload = new FormData();
      payload.append("resident_id", formData.resident_id);
      payload.append("billing_date", formData.billing_date);
      payload.append("billing_amount", formData.billing_amount.toString());
      payload.append("status", formData.status);
      payload.append("payment_evidence", formData.payment_evidence);
      contentType = 'multipart/form-data';
    }else{
      payload = {
        resident_id: formData.resident_id,
        billing_date: formData.billing_date,
        billing_amount: formData.billing_amount,
        status: formData.status
      };
    }
    
    const res = await SatellitePrivate.post(
      '/payments', payload ,
      {
        headers:{
          'Content-Type': contentType,
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

export async function getByIdPayment(id: string | number): Promise<formatMessage<Payment>> {
  try {
    const res = await SatellitePrivate.get<formatMessage<Payment>>(`/payments/${id}`);
    const response = res.data;

    if (response.success && response.data) {
      if(response.data.payment_evidence !== null){
        try {
          const responseFile = await SatellitePrivate.get(`/payments/get-file/${id}`, { responseType: 'blob' });

          if (responseFile.status === 200) {
            const blob = responseFile.data;
            const contentType = responseFile.headers['content-type'];
            const fileName = response.data.payment_file_name || 'unknown';
            const file = new File([blob], fileName, { type: contentType });

            response.data.file_payment_evidence = file;
          } else {
            console.error('Failed to fetch the file. Status code:', responseFile.status);
            response.data.file_payment_evidence = undefined;
          }
        } catch (fileError) {
          console.error('Error fetching payment file:', fileError);
          response.data.file_payment_evidence = undefined;
        }
      }
    }

    return response;
  } catch (error) {
    console.error('Error fetching payment:', error);
    return {
      success: false,
      message: 'An unexpected error occurred.',
      data: null,
    };
  }
}

export async function putPayment(formData: PaymentEditForm, id: string | number) {
  try {
    const payload = new FormData();
    payload.append("_method", "PUT");
    
    payload.append("resident_id", formData.resident_id);
    payload.append("billing_date", formData.billing_date);
    payload.append("billing_amount", formData.billing_amount.toString());
    payload.append("status", formData.status);
    if(formData.payment_evidence !== null){
      payload.append("payment_evidence", formData.payment_evidence);
    }
    const res = await SatellitePrivate.post<formatMessage<null>>(
      `/payments/${id}`, payload ,
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

export async function deletePayment(id: string | number) {
  try {
    const res = await SatellitePrivate.delete<formatMessage<null>>(
      `/payments/${id}`
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