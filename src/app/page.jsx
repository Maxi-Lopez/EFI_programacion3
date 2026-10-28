'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SplashPage() {
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      setTimeout(() => {
        router.replace('/dashboard');
      }, 600);
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  if (!showContent) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="Nexusgamer Logo"
          width={120}
          height={120}
          className="mb-4"
        />
        <h1 className="text-4xl font-bold text-slate-800">Nexusgamer</h1>
        <p className="mt-2 text-slate-500">Tu tienda de computación</p>
      </div>
    );
  }

  return null;
}
