'use client';

import { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminToastProvider } from '@/components/admin/AdminToast';
import { AdminToastFromQuery } from '@/components/admin/AdminToastFromQuery';

export function AdminShell({
  children,
  adminEmail,
  initialQuery,
}: {
  children: React.ReactNode;
  adminEmail: string;
  initialQuery?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminToastProvider>
      <AdminToastFromQuery />
      <div className="flex min-h-screen bg-stone-50 text-stone-800">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader
            adminEmail={adminEmail}
            initialQuery={initialQuery}
            onMenuClick={() => setSidebarOpen(true)}
          />
          <main id="admin-main" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1400px]">{children}</div>
          </main>
        </div>
      </div>
    </AdminToastProvider>
  );
}
