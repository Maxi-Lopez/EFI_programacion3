export default function Cargando({ mensaje = 'Cargando…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-sm text-slate-500 gap-2">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      <span>{mensaje}</span>
    </div>
  );
}
