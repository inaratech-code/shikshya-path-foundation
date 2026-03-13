export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans antialiased bg-slate-50 min-h-screen">
      {children}
    </div>
  );
}
