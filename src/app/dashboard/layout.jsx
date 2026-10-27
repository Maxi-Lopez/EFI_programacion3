'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('access_token')
        : null;
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white p-4">
        <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
