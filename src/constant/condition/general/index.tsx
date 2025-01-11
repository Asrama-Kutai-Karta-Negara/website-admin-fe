import { RadioButtonItem } from '@interfaces/interface-items';
import { 
    LayoutDashboard, 
    Images, 
    UserRoundPen,
    WalletMinimal,
    ChartColumnDecreasing,
    FileText
} from 'lucide-react';
import { 
  createTitleAndBreadcrumbs, 
  galleryString, 
  galleryUrl,
  residentString, 
  residentUrl,
  paymentString,
  paymentUrl, 
  reportUrl
} from '@constant/breadcrumbs';

const galleries = createTitleAndBreadcrumbs(galleryString, galleryUrl);
const residents = createTitleAndBreadcrumbs(residentString, residentUrl);
const payments = createTitleAndBreadcrumbs(paymentString, paymentUrl);

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
    label: galleries.indexTitle,
    icon: Images,
    link:`/${galleryUrl}`,
  },
  {
    label: residents.indexTitle,
    icon: UserRoundPen,
    link: `/${residentUrl}`,
  },
  {
    label: payments.indexTitle,
    icon: WalletMinimal,
    link: `/${paymentUrl}`,
  },
  {
    label: 'Laporan',
    icon: FileText,
    link: `/${reportUrl}`,
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

const deleteItem: Array<{
  label: string;
  path: string | null;
  key: string;
}> = [
  {
    label: 'Foto/Video',
    key: 'galleries',
    path: 'galleries'
  },
  {
    label: 'Penghuni',
    path: 'residents',
    key: 'residents'
  },
  {
    label: 'Pembayaran',
    path: 'payments',
    key: 'payments'
  },
  {
    label: 'Nothing',
    path: null,
    key: 'not-found'
  },
];

export { 
  menuItems,
  deleteItem,
  typeMediaGallery, 
  statusPaymentGallery
};