import type { Metadata } from 'next';
import AdminViewportGuard from '@/components/AdminViewportGuard';
import AdminAuthGuard from '@/components/AdminAuthGuard';
import AdminAppShell from '@/components/admin/AdminAppShell';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function AdminSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <AdminViewportGuard>
        <AdminAppShell>{children}</AdminAppShell>
      </AdminViewportGuard>
    </AdminAuthGuard>
  );
}
