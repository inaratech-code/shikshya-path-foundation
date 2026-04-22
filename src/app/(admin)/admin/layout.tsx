import type { Metadata } from 'next';
import AdminViewportGuard from '@/components/AdminViewportGuard';
import AdminAuthGuard from '@/components/AdminAuthGuard';
import AdminAppShell from '@/components/admin/AdminAppShell';
import { isSupabaseEnvConfigured } from '@/lib/supabaseEnv';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function AdminSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminViewportGuard>
      {/* Middleware is the main guard. Keep client guard as a fallback during local dev. */}
      {isSupabaseEnvConfigured() ? (
        <AdminAuthGuard>
          <AdminAppShell>{children}</AdminAppShell>
        </AdminAuthGuard>
      ) : (
        <AdminAppShell>{children}</AdminAppShell>
      )}
    </AdminViewportGuard>
  );
}
