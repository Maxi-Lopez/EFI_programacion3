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
        <div className="relative w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] mb-6">
          <Image
            src="/images/logo.png"
            alt="Nexusgamer Logo"
            fill
            sizes="(max-width: 600px) 80vw, 600px"
            className="object-contain"
          />
        </div>
        <h1 className="text-5xl font-bold text-slate-800">Nexusgamer</h1>
        <p className="mt-4 text-slate-500 text-2xl">Tu tienda de computación</p>
      </div>
    );
  }

  return null;
}
