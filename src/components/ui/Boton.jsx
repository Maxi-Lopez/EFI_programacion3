export default function Boton({ children, type = 'button', className = '', disabled, onClick }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
