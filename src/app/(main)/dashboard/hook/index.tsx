'use client';

import { chartIncomeData, chartOutcomeData, StaticData } from '@interfaces/data-types';
import { getKamarTerpakai, getPemasukanBulanan, getPengeluaranBulanan, getResidentActive } from '@services/dashboard';
import { useState } from 'react';

export function useQueryClient() {
  const [isLoading, setIsLoading] = useState(false);

  const activeResidents = async (
    onSuccess?: () => void
  ) : Promise<StaticData | null> => {
    setIsLoading(true);

    try {
      const response = await getResidentActive();
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

  const kamarTerpakai = async (
    onSuccess?: () => void
  ) : Promise<StaticData | null> => {
    setIsLoading(true);

    try {
      const response = await getKamarTerpakai();
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

  const pemasukanBulanan = async (
    bulan: number, 
    onSuccess?: () => void
  ) : Promise<chartIncomeData | null> => {
    setIsLoading(true);

    try {
      const response = await getPemasukanBulanan(bulan);
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

  const pengeluranBulanan = async (
    bulan: number, 
    onSuccess?: () => void
  ) : Promise<chartOutcomeData | null> => {
    setIsLoading(true);

    try {
      const response = await getPengeluaranBulanan(bulan);
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
  return {
    isLoading,
    activeResidents,
    kamarTerpakai,
    pemasukanBulanan,
    pengeluranBulanan
  };
}
