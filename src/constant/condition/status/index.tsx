const statusItems: Array<{
  label: string;
  colorBg: string;
  colorBgDark: string | null;
  colorText: string;
  colorTextDark: string | null;
  paddingX: string;
  key:string;
  tooltipContent: string | null;
}> = [
  {
    label: 'Aktif',
    colorBg: 'bg-[#CCFFDB]',
    colorBgDark: null,
    colorText: 'text-green',
    colorTextDark: 'text-black',
    paddingX: 'px-4',
    key: 'active',
    tooltipContent: null
  },
  {
    label: 'Tidak Aktif',
    colorBg: ' bg-background',
    colorBgDark: null,
    colorText: 'text-gray-500',
    colorTextDark: 'text-white',
    paddingX: 'px-4',
    key: 'inactive',
    tooltipContent: null
  },
  {
    label: 'Sudah Dibayar',
    colorBg: 'bg-[#CCFFDB]',
    colorBgDark: null,
    colorText: 'text-green',
    colorTextDark: 'text-black',
    paddingX: 'px-4',
    key: 'Sudah Dibayar',
    tooltipContent: null
  },
  {
    label: 'Belum Dibayar',
    colorBg: ' bg-background',
    colorBgDark: null,
    colorText: 'text-gray-500',
    colorTextDark: 'text-white',
    paddingX: 'px-4',
    key: 'Belum Dibayar',
    tooltipContent: null
  },
  {
    label: 'Pemasukan',
    colorBg: 'bg-[#CCFFDB]',
    colorBgDark: null,
    colorText: 'text-green',
    colorTextDark: 'text-black',
    paddingX: 'px-4',
    key: 'Pemasukan',
    tooltipContent: null
  },
  {
    label: 'Pengeluaran',
    colorBg: ' bg-background',
    colorBgDark: null,
    colorText: 'text-gray-500',
    colorTextDark: 'text-white',
    paddingX: 'px-4',
    key: 'Pengeluaran',
    tooltipContent: null
  },
  {
    label: 'Sudah Disinkron',
    colorBg: 'bg-blue-200',
    colorBgDark: null,
    colorText: 'text-gray-500',
    colorTextDark: 'text-black',
    paddingX: 'px-4',
    key: '1',
    tooltipContent: null
  },
  {
    label: 'Belum Disinkron',
    colorBg: ' bg-background',
    colorBgDark: null,
    colorText: 'text-gray-500',
    colorTextDark: 'text-white',
    paddingX: 'px-4',
    key: '0',
    tooltipContent: null
  },
  {
    label: 'Status Not Found',
    colorBg: ' bg-red-300',
    colorBgDark: null,
    colorText: 'text-black',
    colorTextDark: '',
    paddingX: 'px-[35px]',
    key: 'not-found',
    tooltipContent: null
  },
];

export { statusItems };