import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Suspense } from 'react';
import './globals.css';

export const metadata = {
  title: 'Mi Proyecto - Catálogo',
  description: 'Frontend consumiendo API Django REST',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Suspense fallback={<nav className="border-b border-slate-200 bg-white sticky top-0 z-50" />}>
              <Navbar />
            </Suspense>
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
