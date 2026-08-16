import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminSession, isAdminAuthenticated } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated().catch(() => false);

  if (!authed) {
    return (
      <div className="min-h-screen bg-stone-100 text-stone-800">{children}</div>
    );
  }

  const session = await getAdminSession();
  const adminEmail = session?.email ?? process.env.ADMIN_EMAIL ?? 'Admin';

  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
      <AdminShell adminEmail={adminEmail}>{children}</AdminShell>
    </Suspense>
  );
}
