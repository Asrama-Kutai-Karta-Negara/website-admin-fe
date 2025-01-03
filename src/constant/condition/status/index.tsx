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
    paddingX: '4',
    key: 'active',
    tooltipContent: null
  },
  {
    label: 'Tidak Aktif',
    colorBg: ' bg-background',
    colorBgDark: null,
    colorText: 'text-gray-500',
    colorTextDark: 'text-white',
    paddingX: '4',
    key: 'inactive',
    tooltipContent: null
  },
  {
    label: 'Sudah Dibayar',
    colorBg: 'bg-[#CCFFDB]',
    colorBgDark: null,
    colorText: 'text-green',
    colorTextDark: 'text-black',
    paddingX: '12',
    key: 'Sudah Dibayar',
    tooltipContent: null
  },
  {
    label: 'Belum Dibayar',
    colorBg: ' bg-background',
    colorBgDark: null,
    colorText: 'text-gray-500',
    colorTextDark: 'text-white',
    paddingX: '12',
    key: 'Belum Dibayar',
    tooltipContent: null
  },
  {
    label: 'Status Not Found',
    colorBg: ' bg-red-300',
    colorBgDark: null,
    colorText: 'text-black',
    colorTextDark: '',
    paddingX: '35px',
    key: 'not-found',
    tooltipContent: null
  },
];

export { statusItems };