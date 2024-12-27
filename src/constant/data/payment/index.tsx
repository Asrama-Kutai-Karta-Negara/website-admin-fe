import { paymentString, residentString } from "@constant/breadcrumbs";

const addPaymentForm: Array<{
  label: string;
  placeholder: string | null;
}> = [
  {
    label:  `${residentString}`,
    placeholder: `-- Pilih ${residentString} --`,
  },
  {
    label: `Tanggal ${paymentString}`,
    placeholder: null,
  },
  {
    label: `Total ${paymentString}`,
    placeholder: 'Rp 0',
  }, 
  {
    label: `Status ${paymentString}`,
    placeholder: `-- Pilih Status ${residentString} --`,
  },
  {
    label: `Bukti ${paymentString}`,
    placeholder: null,
  },
];

export { addPaymentForm };