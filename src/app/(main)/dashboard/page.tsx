'use client';

import { createTitleAndBreadcrumbs, dashboardString, dashboardUrl } from "@constant/breadcrumbs";
import { DataStaticCardProps } from "@interfaces/interface-items";
import Breadcumbs from "@ui/breadcrumbs";
import { useQueryClient } from "./hook";
import { useEffect, useRef, useState } from "react";
import DashboardCard from "@components/particel/dashboard-card";
import ChartCard from "@components/particel/dashboard-chart";
import DynamicCard from "@components/particel/dynamic-card";
import { 
  Select, 
  SelectTrigger, 
  SelectValue,
  SelectContent, 
  SelectItem 
} from "@components/select";
import { formatCurrency } from "@utils/format";

export default function DashboardPage() {

  const weeklyLabels = ['Minggu Ke-1', 'Minggu Ke-2', 'Minggu Ke-3', 'Minggu Ke-4'];

  const { activeResidents, kamarTerpakai, pemasukanBulanan, pengeluranBulanan, sinkronisasiPayment } = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [penghuni, setPenghuni] = useState<DataStaticCardProps[]>([]);
  const [kamar, setKamar] = useState<DataStaticCardProps[]>([]);
  const [pemasukan, setPemasukan] = useState<number[]>([]);
  const [pengeluran, setPengeluran] = useState<number[]>([]);
  const [pendapatan, setPendapatan] = useState<number>(0);
  const [sinkronisasi, setSinkronisasi] = useState<number>(0);
  const [bulan, setBulan] = useState<{ value: number; text: string }[]>([
    { value: 1, text: 'Januari' },
    { value: 2, text: 'Februari' },
    { value: 3, text: 'Maret' },
    { value: 4, text: 'April' },
    { value: 5, text: 'Mei' },
    { value: 6, text: 'Juni' },
    { value: 7, text: 'Juli' },
    { value: 8, text: 'Agustus' },
    { value: 9, text: 'September' },
    { value: 10, text: 'Oktober' },
    { value: 11, text: 'November' },
    { value: 12, text: 'Desember' },
  ]);
  const [monthPemasukan, setMonthPemasukan] = useState<number>(new Date().getMonth() + 1); 
  const [monthPengeluaran, setMonthPengeluaran] = useState<number>(new Date().getMonth() + 1); 

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const fetchActiveResident = async () => {
      try {
        const datas = await activeResidents(() => {});
        if (datas) {
          setPenghuni([
            {
              name: "Total",
              count: datas.data_count,
              fill: "white",
            },
            {
              name: "Penghuni",
              count: datas.data_active,
              fill: "#2280CC",
            }
          ]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchKamarTerpakai = async () => {
      try {
        const datas = await kamarTerpakai(() => {});
        if (datas) {
          setKamar([
            {
              name: "Total",
              count: datas.data_count,
              fill: "white",
            },
            {
              name: "Kamar",
              count: datas.data_active,
              fill: "#2280CC",
            }
          ]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPemasukan = async (month: number) => {
      try {
        const datas = await pemasukanBulanan(month, () => {});
        if (datas) {
          setPemasukan(datas.weekly_income);
          const totalPemasukan = datas.total_income;
          setPendapatan((prevPendapatan) => prevPendapatan + totalPemasukan);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPengeluaran = async (month: number) => {
      try {
        const datas = await pengeluranBulanan(month, () => {});
        if (datas) {
          setPengeluran(datas.weekly_outcome);
          const totalPengeluaran = datas.total_outcome;
          setPendapatan((prevPendapatan) => prevPendapatan - totalPengeluaran);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSinkronisasi = async () => {
      try {
        const datas = await sinkronisasiPayment(() => {});
        if (datas) {
          setSinkronisasi(datas.data_active);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveResident();
    fetchKamarTerpakai();
    fetchPemasukan(monthPemasukan);
    fetchPengeluaran(monthPengeluaran);
    fetchSinkronisasi();
    hasFetched.current = true;
  }, [activeResidents, kamarTerpakai, pemasukanBulanan, pengeluranBulanan]);

  useEffect(() => {
    const fetchPemasukan = async (month: number) => {
      try {
        const datas = await pemasukanBulanan(month, () => {});
        if (datas) {
          setPemasukan(datas.weekly_income);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPengeluaran = async (month: number) => {
      try {
        const datas = await pengeluranBulanan(month, () => {});
        if (datas) {
          setPengeluran(datas.weekly_outcome);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPemasukan(monthPemasukan);
    fetchPengeluaran(monthPengeluaran);
  }, [monthPemasukan, monthPengeluaran]);

  const handleMonthPemasukanChange = (value: string) => {
    setMonthPemasukan(parseInt(value, 10));
  };
  const handleMonthPengeluaranChange = (value: string) => {
    setMonthPengeluaran(parseInt(value, 10));
  };
  const breadcrumbs = createTitleAndBreadcrumbs(dashboardString, dashboardUrl);
  return (
    <div className='container max-w-screen-xl mx-auto px-4'>
      <Breadcumbs title={breadcrumbs.mainTitle} breadCrumbs={breadcrumbs.breadCrumbsMain} />
      <div className="flex flex-col space-y-4 mt-2">
        <div className="grid grid-cols-4 gap-4">
          <DashboardCard 
            title="Total Penghuni Asrama"
            subtitle="Penghuni Aktif"
            isBar={true}
            value={penghuni[1]?.count || 0} 
            total={penghuni[0]?.count || 0} 
            colorMain="#2280CC"
            detailLink="/residents"
          />
          <DashboardCard 
            title="Total Kamar" 
            subtitle="Kamar Terpakai"
            isBar={true}
            value={kamar[1]?.count || 0} 
            total={kamar[0]?.count || 0} 
            colorMain="#E66969"
            detailLink="#" 
          />
          <DashboardCard 
            title="Total Pendapatan Bulan Ini" 
            subtitle="Pemasukan"
            isBar={false}
            value={formatCurrency(pendapatan.toString() || '')} 
            total="" 
            colorMain="#1DBB6C"
            detailLink="/reports"
          />
          <DashboardCard 
            title="Menunggu Validasi" 
            subtitle="Total Laporan Pembayaran"
            isBar={false}
            value={sinkronisasi} 
            total="Total Laporan Pembayaran" 
            colorMain="#E6AA06"
            detailLink="/payments" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DynamicCard 
            header={
              <div className='flex p-4 justify-between'>
                <div className="w-[50%]">
                  <span>Total Pemasukan Bulanan</span>
                </div>
                <div className="w-[50%]">
                  <Select value={monthPemasukan.toString()} onValueChange={handleMonthPemasukanChange}>
                    <SelectTrigger aria-label={`pemasukan`} className=" bg-transparent">
                      <SelectValue placeholder={'Pilih bulan'} />
                    </SelectTrigger>
                    <SelectContent>
                      {bulan.map((item, index) => (
                        <SelectItem value={item.value.toString()} key={index}>
                          {item.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            }
            border={true}
            body={
              <ChartCard
                data={pemasukan || []} 
                labels={weeklyLabels} 
              />
            }
          />
          
          <DynamicCard 
            header={
              <div className='flex p-4 justify-between'>
                <div className="w-[50%]">
                  <span>Total Pengeluaran Bulanan</span>
                </div>
                <div className="w-[50%]">
                  <Select value={monthPengeluaran.toString()} onValueChange={handleMonthPengeluaranChange}>
                  <SelectTrigger aria-label={`pemasukan`} className=" bg-transparent">
                    <SelectValue placeholder={'Pilih bulan'} />
                  </SelectTrigger>
                  <SelectContent>
                    {bulan.map((item, index) => (
                      <SelectItem value={item.value.toString()} key={index}>
                        {item.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                </div>
              </div>
            }
            border={true}
            body={
              <ChartCard 
                data={pengeluran || []} 
                labels={weeklyLabels} 
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
