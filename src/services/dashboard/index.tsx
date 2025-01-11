import { chartIncomeData, chartOutcomeData, formatMessage, StaticData} from '@interfaces/data-types';
import SatellitePrivate from '@services/satellite/private';

export async function getResidentActive(): Promise<formatMessage<StaticData>> {
  try {

    const res = await SatellitePrivate.get<formatMessage<StaticData>>('/residents/grafik/active');
    return  res.data;
  } catch (error) {
    console.error('Error fetching datas:', error);
    return {
      success: false,
      message: 'An unexpected error occurred.',
      data: null,
    };
  }
}

export async function getKamarTerpakai(): Promise<formatMessage<StaticData>> {
  try {

    const res = await SatellitePrivate.get<formatMessage<StaticData>>('/rooms/grafik/occupied');
    return  res.data;
  } catch (error) {
    console.error('Error fetching datas:', error);
    return {
      success: false,
      message: 'An unexpected error occurred.',
      data: null,
    };
  }
}

export async function getPemasukanBulanan(bulan: number): Promise<formatMessage<chartIncomeData>> {
  try {

    const res = await SatellitePrivate.get<formatMessage<chartIncomeData>>(`/income/grafik/${bulan}`);
    return  res.data;
  } catch (error) {
    console.error('Error fetching datas:', error);
    return {
      success: false,
      message: 'An unexpected error occurred.',
      data: null,
    };
  }
}

export async function getPengeluaranBulanan(bulan: number): Promise<formatMessage<chartOutcomeData>> {
  try {

    const res = await SatellitePrivate.get<formatMessage<chartOutcomeData>>(`/outcome/grafik/${bulan}`);
    return  res.data;
  } catch (error) {
    console.error('Error fetching datas:', error);
    return {
      success: false,
      message: 'An unexpected error occurred.',
      data: null,
    };
  }
}