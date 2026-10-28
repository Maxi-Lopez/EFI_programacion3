import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Nexusgamer Logo"
              width={36}
              height={36}
              className="rounded"
            />
            <span className="text-sm font-medium text-slate-600">Nexusgamer</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors" aria-label="Facebook">
              <Image src="/images/face.png" alt="Facebook" width={28} height={28} />
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors" aria-label="Telegram">
              <Image src="/images/tele.jpg" alt="Telegram" width={28} height={28} />
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors" aria-label="Instagram">
              <Image src="/images/insta.jpg" alt="Instagram" width={28} height={28} />
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
