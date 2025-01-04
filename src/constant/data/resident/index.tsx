const addResidentForm: Array<{
  label: string;
  placeholder: string | null;
}> = [
  {
    label: 'Nama Lengkap',
    placeholder: 'Masukkan nama lengkap',
  },
  {
    label: 'Umur',
    placeholder: 'Masukkan umur',
  },
  {
    label: 'Tanggal Lahir',
    placeholder: null,
  }, 
  {
    label: 'Nomor Telepon',
    placeholder: 'Masukkan nomor',
  },
  {
    label: 'Asal Kampus',
    placeholder: '-- Pilih Kampus --',
  },
  {
    label: 'Nomor Kamar',
    placeholder: '-- Pilih Nomor Kamar --',
  },
  {
    label: 'Alamat Asal Daerah',
    placeholder: 'Masukkan alamat',
  },
  {
    label: 'Kota Asal',
    placeholder: '-- Pilih Kota Asal --',
  },
];

export { addResidentForm };