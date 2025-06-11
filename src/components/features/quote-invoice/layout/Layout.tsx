import type { ReactNode } from 'react';
import Header from './Header';
import { Toaster } from '../ui/toaster';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Toaster />
    </div>
  );
}