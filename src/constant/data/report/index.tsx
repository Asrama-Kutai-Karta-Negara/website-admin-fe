import { reportString } from "@constant/breadcrumbs";

const addReportForm: Array<{
  label: string;
  placeholder: string | null;
}> = [
  {
    label:  `Judul Laporan`,
    placeholder: `Masukkan judul laporan`,
  },
  {
    label: `Tanggal ${reportString}`,
    placeholder: null,
  },
  {
    label: `Kategori ${reportString}`,
    placeholder: `-- Pilih Kategori --`,
  },
  {
    label: `Nominal`,
    placeholder: 'Rp 0',
  },
  {
    label: `Bukti ${reportString}`,
    placeholder: null,
  },
];

export { addReportForm };