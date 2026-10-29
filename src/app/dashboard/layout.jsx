export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
