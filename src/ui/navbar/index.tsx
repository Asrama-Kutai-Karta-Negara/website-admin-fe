import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo2.png';

import { Menu } from 'lucide-react';
import DynamicText from '@components/particel/dynamic-text';
import RightNavBar from '@ui/rightnavbar';

const Navbar = () => {
  return (
    <div className="bg-primary py-2 px-5 flex justify-between">
      <div className="flex items-center py-2 px-2">
        <div className="flex space-x-4">
          <Link href='/'>
            <Image src={logo} alt='Asrama Kutai Karta Negara logo' width={30} />
          </Link>
          <DynamicText
            text={`ASRAMA KUTAI KARTANEGARA`} 
            subText={`Kota Yogyakarta`}
          />
          <div className='text-black hover:bg-background dark:text-white  border-0 mr-5 p-2'>
            <Menu size={20} />
          </div>
        </div>
      </div>
      <div className='flex items-center'>
        <div className="flex items-center px-4 space-x-4">
          <RightNavBar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
