import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.png';
import { Avatar, AvatarImage, AvatarFallback } from '@components/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@ui/dropdown-menu';

import ThemeToggler from '@ui/theme/ThemeToggler';

const Navbar = () => {
  return (
    <div className='bg-primary dark:bg-slate-500 text-white py-2 px-5 flex justify-between'>
      <Link href='/'>
        <Image src={logo} alt='TraversyPress' width={40} />
      </Link>

      <div className='flex items-center'>
        <ThemeToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className='focus:outline-none'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback className='text-black'>BT</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href='/profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/auth'>Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
