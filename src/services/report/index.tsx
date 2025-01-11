import { ExportReportForm, formatMessage, GenerateReport, Report, ReportAddForm, ReportEditForm} from '@interfaces/data-types';
import SatellitePrivate from '@services/satellite/private';
import { AxiosError } from 'axios';

export async function putSyncPayment(): Promise<formatMessage<null>> {
  try {
    const res = await SatellitePrivate.put<formatMessage<null>>('reports-sync');
    return res.data;
  } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'An error occurred.';
        return {
          success: false,
          message: message || 'Unexpected server error.',
          data: null
        };
      } else {
        console.error('Unexpected error:', error);
        return {
          success: false,
          message: 'An unexpected error occurred.',
          data: null
        };
      }
    }
}

export async function postReport(formData: ReportAddForm) {
   try {
    let payload;
    let contentType = 'application/json';
    if(formData.report_evidence !== undefined){
      payload = new FormData();
      payload.append("title", formData.title);
      payload.append("report_date", formData.report_date);
      payload.append("report_amount", formData.report_amount.toString());
      payload.append("report_categories", formData.report_categories);
      payload.append("report_evidence", formData.report_evidence);
      contentType = 'multipart/form-data';
    }else{
      payload = {
        title: formData.title,
        report_date: formData.report_date,
        report_amount: formData.report_amount,
        report_categories: formData.report_categories
      };
    }
    
    const res = await SatellitePrivate.post(
      '/reports', payload ,
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

export async function getByIdReport(id: string | number): Promise<formatMessage<Report>> {
  try {
    const res = await SatellitePrivate.get<formatMessage<Report>>(`/reports/${id}`);
    const response = res.data;
    if (response.success && response.data) {
      if(response.data.report_evidence !== null){
        try {
          const responseFile = await SatellitePrivate.get(`/reports/get-file/${id}`, { responseType: 'blob' });

          if (responseFile.status === 200) {
            const blob = responseFile.data;
            const contentType = responseFile.headers['content-type'];
            const fileName = response.data.report_file_name || 'unknown';
            const file = new File([blob], fileName, { type: contentType });

            response.data.file_report_evidence = file;
          } else {
            console.error('Failed to fetch the file. Status code:', responseFile.status);
            response.data.file_report_evidence = undefined;
          }
        } catch (fileError) {
          console.error('Error fetching payment file:', fileError);
          response.data.file_report_evidence = undefined;
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

export async function putReport(formData: ReportEditForm, id: string | number) {
  try {
    const payload = new FormData();
    payload.append("_method", "PUT");
    
    payload.append("title", formData.title);
    payload.append("report_date", formData.report_date);
    payload.append("report_amount", formData.report_amount.toString());
    payload.append("report_categories", formData.report_categories);

    if(formData.report_evidence !== null){
      payload.append("report_evidence", formData.report_evidence);
    }

    const res = await SatellitePrivate.post<formatMessage<null>>(
      `/reports/${id}`, payload ,
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

export async function deleteReport(id: string | number) {
  try {
    const res = await SatellitePrivate.delete<formatMessage<null>>(
      `/reports/${id}`
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

export async function postExportReport(formData: ExportReportForm) {
  try {
    const payload = new FormData();
    payload.append('range_date', formData.range_date);

    const formatFile = formData.format_file || 'PDF';
    payload.append('format_file', formatFile);

    const headers: Record<string, string> = {
      'Content-Type': 'multipart/form-data',
    };

    const res = await SatellitePrivate.post<formatMessage<GenerateReport>>(
      `/reports/export`,
      payload,
      {
        headers,
      }
    );
    
    const response =  res.data;
    if (response.success && response.data != null) {
      const fileUrl = response.data.file_url;
      const fileName = response.data.file_name;
      const responseFile = await SatellitePrivate.get(`reports/generate/get-file/${fileName}`, { responseType: 'blob' });

      if (responseFile.status === 200) {
        const blob = responseFile.data;
        const fileBlobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileBlobUrl;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(fileBlobUrl);
        return {
          status: true,
          message: response.message,
        };
      } else {
        console.error('Failed to fetch the file. Status code:', responseFile.status);
        return {
          status: false,
          message: 'Failed to fetch file.',
        };
      }
    } else {
      return {
        status: false,
        message: response.message,
      };
    }
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