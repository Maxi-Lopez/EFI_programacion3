import Navbar from '@/components/layout/Navbar';
import MenuLineal from '@/components/layout/MenuLineal';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Suspense } from 'react';
import BackToTop from '@/components/ui/BackToTop';
import './globals.css';

export const metadata = {
  title: 'Nexusgamer - Tienda de Computación',
  description: 'Frontend consumiendo API Django REST',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <ThemeProvider>
            <Suspense fallback={<div className="h-16 w-full border-b border-slate-200 bg-white" />}>
              <Navbar />
            </Suspense>
            <MenuLineal />
            <main className="flex-grow">{children}</main>
            <Footer />
            <BackToTop />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
