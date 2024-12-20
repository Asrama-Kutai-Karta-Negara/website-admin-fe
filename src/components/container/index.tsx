'use client';

import { useEffect, useState } from 'react';
import { ThemeProviderProps } from 'next-themes';
import Provider from '@components/provider';

export function ContainerProvider({ children, ...props }: ThemeProviderProps) {
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Provider {...props}>{children}</Provider>;
}