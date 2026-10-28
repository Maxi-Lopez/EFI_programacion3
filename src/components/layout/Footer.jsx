import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/Nexusgamer%20Logo%20Showcase.png"
              alt="Nexusgamer Logo"
              width={24}
              height={24}
              className="rounded"
              unoptimized
            />
            <span className="text-sm font-medium text-slate-600">Nexusgamer</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors">
              <Image src="/redessociales.jpg" alt="Redes sociales" width={24} height={24} unoptimized />
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors">
              <Image src="/redessociales.jpg" alt="Redes sociales" width={24} height={24} unoptimized />
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors">
              <Image src="/redessociales.jpg" alt="Redes sociales" width={24} height={24} unoptimized />
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors">
              <Image src="/redessociales.jpg" alt="Redes sociales" width={24} height={24} unoptimized />
            </a>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right">
            Nexusgamer &mdash; Tienda de computación &copy;
          </div>
        </div>
      </div>
    </footer>
  );
}
