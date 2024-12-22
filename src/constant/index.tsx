import { Gallery } from '@interfaces/interface-items';
import { 
    LayoutDashboard, 
    Images, 
    UserRoundPen,
    WalletMinimal,
    ChartColumnDecreasing,
    FileText
} from 'lucide-react';
import { Tooltip } from '@nextui-org/react'

import { DeleteIcon, EditIcon, EyeIcon } from '@assets/icons/icons';

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

// const columnsGallery = [
//   {
//     key: 'name',
//     label: 'NAME'
//   },
//   {
//     key: 'lastSeen',
//     label: 'Last Seen'
//   },
//   {
//     key: 'actions',
//     label: 'Actions'
//   }
// ]

// const renderCell = (gallery: Gallery, columnKey: React.Key) => {
//   const cellValue = gallery[columnKey as keyof Gallery]

//   switch (columnKey) {
    
//     case 'lastSeen':
//       return <span>{new Date(cellValue).toLocaleDateString()}</span>
//     case 'actions':
//       return (
//         <div className='relative flex items-center gap-4'>
//           <Tooltip content='Details'>
//             <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
//               <EyeIcon />
//             </span>
//           </Tooltip>
//           <Tooltip content='Edit user'>
//             <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
//               <EditIcon />
//             </span>
//           </Tooltip>
//           <Tooltip color='danger' content='Delete user'>
//             <span className='cursor-pointer text-lg text-danger active:opacity-50'>
//               <DeleteIcon />
//             </span>
//           </Tooltip>
//         </div>
//       )
//     default:
//       return cellValue
//   }
// }

export { menuItems, profileItems, columnsGallery, renderCell };