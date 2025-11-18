'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {children}
    </ThemeProvider>
  );
}
