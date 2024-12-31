import { RadioButtonItem } from '@interfaces/interface-items';
import { 
    LayoutDashboard, 
    Images, 
    UserRoundPen,
    WalletMinimal,
    ChartColumnDecreasing,
    FileText
} from 'lucide-react';
import { galleriesTitle, residentsTitle } from '@constant/breadcrumbs';

const menuItems: Array<{
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}> = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    link: '/',
  },
  {
    label: galleriesTitle,
    icon: Images,
    link: '/galleries',
  },
  {
    label: residentsTitle,
    icon: UserRoundPen,
    link: '/residents',
  },
  {
    label: 'Kelola Pembayaran',
    icon: WalletMinimal,
    link: '/payments',
  },
  {
    label: 'Grafik Spesifik',
    icon: ChartColumnDecreasing,
    link: '#',
  },
  {
    label: 'Laporan',
    icon: FileText,
    link: '#',
  },
];

const typeMediaGallery: RadioButtonItem[] = [
  {
    value: 'Foto',
    name: 'Foto'
  },
  {
    value: 'Video',
    name: 'Video'
  },
];

const originCampusResident: RadioButtonItem[] = [
  {
    value: 'Kampus 1',
    name: 'Kampus 1'
  },
  {
    value: 'Kampus 2',
    name: 'Kampus 2'
  },
  {
    value: 'Kampus 3',
    name: 'Kampus 3'
  },
  {
    value: 'Kampus 4',
    name: 'Kampus 4'
  },
  {
    value: 'Kampus 5',
    name: 'Kampus 5'
  }
];

const roomNumberResident: RadioButtonItem[] = [
  {
    value: '1A',
    name: '1A'
  },
  {
    value: '1B',
    name: '1B'
  },
  {
    value: '2A',
    name: '2A'
  },
  {
    value: '2B',
    name: '2B'
  },
  {
    value: '3A',
    name: '3A'
  },
  {
    value: '3B',
    name: '3B'
  }
];

const statusPaymentGallery: RadioButtonItem[] = [
  {
    value: 'Belum Dibayar',
    name: 'Belum Dibayar'
  },
  {
    value: 'Sudah Dibayar',
    name: 'Sudah Dibayar'
  },
];

export { menuItems, typeMediaGallery, originCampusResident, roomNumberResident, statusPaymentGallery };