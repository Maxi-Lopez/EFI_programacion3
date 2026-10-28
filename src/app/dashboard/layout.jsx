export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white p-4">
        <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
