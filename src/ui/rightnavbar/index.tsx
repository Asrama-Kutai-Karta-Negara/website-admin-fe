'use client';

import React, { useEffect, useState } from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@components/avatar';
import ThemeToggler from '@ui/theme/ThemeToggler';
import { ChevronDown, Bell } from 'lucide-react';
import DynamicText from '@components/particel/dynamic-text';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@components/dropdown-menu';
import Link from 'next/link';
import CustomText from '@components/particel/custom-text';
import { deleteCookies, logout } from '@services/auth/01-auth';
import { useToast } from '@interfaces/use-toast';
import { formatMessage } from '@interfaces/data-types';
import { redirect } from 'next/navigation';

const RightNavBar = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let formattedTime = currentDate.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  formattedTime = formattedTime.replace(/\./g, ':');

  const handleLogout = async () => {
    try {
      const logoutResponse : formatMessage = await logout();
      if(logoutResponse.success){
        deleteCookies();
        setTimeout(() => {
          redirect('/');
        }, 1000);
        toast({
          variant: 'success',
          title: 'Logout',
          description: logoutResponse.message
        });
      }else{
        toast({
          variant: 'failed',
          title: 'Logout',
          description: logoutResponse.message
        });
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
        <CustomText 
          text={formattedDate} 
          textSize={'sm'} 
        />
        <hr className="h-6 border-[1px]" />
        <CustomText 
          text={`${formattedTime} WIB`} 
          textSize={'sm'} 
          textWeight={'semibold'} 
          outline={true} 
          classNameText={'px-2 py-1 rounded text-gold bg-blonde border-yellow border-[1.5px]'}
        />
        <Bell className='h-4 w-4 dark:text-blonde dark:fill-blonde text-[#CCBB22]' fill='#CCBB22'/>
        <ThemeToggler />
        <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='user' />
            <AvatarFallback className='text-black'>BT</AvatarFallback>
        </Avatar>
        <DynamicText
            text={`User Name`} 
            subText={`Admin (ID: AD00001)`}
        />
        <CustomText 
          text={'Online'} 
          textSize={'xs'} 
          textWeight={'semibold'} 
          outline={true} 
          classNameText={'px-2 py-1 rounded text-green bg-background border-green border-[0.5px]'}
        />
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'>
                <ChevronDown className='dark:text-blonde text-[#CCBB22]' size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href='/profile'>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  );
};

export default RightNavBar;