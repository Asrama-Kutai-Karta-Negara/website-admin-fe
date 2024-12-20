'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});


export default function Provider({
    children,
    ...props
}: ThemeProviderProps ) {
    return (
        <QueryClientProvider client={queryClient}>
          <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </QueryClientProvider>
    )
}