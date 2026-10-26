export default function Card({ children, className = '' }) {
  return (
    <div className={`border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
}
