import { 
    LayoutDashboard, 
    Images, 
    UserRoundPen,
    WalletMinimal,
    ChartColumnDecreasing,
    FileText
} from 'lucide-react';

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
    label: 'Kelola Foto',
    icon: Images,
    link: '/posts',
  },
  {
    label: 'Kelola Penghuni',
    icon: UserRoundPen,
    link: '#',
  },
  {
    label: 'Kelola Pembayaran',
    icon: WalletMinimal,
    link: '#',
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

const profileItems: Array<{
  label: string;
  link: string;
}> = [
  {
    label: 'Profile',
    link: '/profile',
  },
  {
    label: 'Logout',
    link: '/auth',
  }
];

export { menuItems, profileItems };