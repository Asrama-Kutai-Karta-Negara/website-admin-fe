import { IItem } from '@interfaces/interface-items';
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
    link: '/galleries',
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

const columnsGallery = [
  {
    key: 'name',
    label: 'NAME'
  },
  {
    key: 'lastSeen',
    label: 'Last Seen'
  },
  {
    key: 'actions',
    label: 'Actions'
  }
]

const items: IItem[] = [
  {
    index: 0,
    label: "All",
    value: "all",
    number: 27,
  },
  {
    index: 1,
    label: "Risk",
    value: "risk",
    number: 4,
  },
  {
    index: 2,
    label: "On Hold",
    value: "onHold",
    number: 6,
  },
  {
    index: 3,
    label: "Potential Risk",
    value: "potentialRisk",
    number: 7,
  },
  {
    index: 4,
    label: "On Track",
    value: "onTrack",
    number: 12,
  },
  {
    index: 5,
    label: "Archived",
    value: "archived",
    number: 9,
  },
];

export { menuItems, profileItems, columnsGallery, items };