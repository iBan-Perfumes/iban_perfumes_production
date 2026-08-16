import { LoginForm } from '@/app/admin/login/LoginForm';
import { isAdminAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await isAdminAuthenticated().catch(() => false)) {
    redirect('/admin');
  }

  const params = await searchParams;
  const nextPath = params.next?.startsWith('/admin') ? params.next : '/admin';

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 bg-stone-50 px-8 py-6">
          <p className="font-tenor text-xl tracking-wide text-stone-900">i-BAN</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-stone-400">
            Admin Panel
          </p>
        </div>
        <div className="px-8 py-8">
          <h1 className="font-tenor text-2xl text-stone-900">Sign in</h1>
          <p className="mt-2 text-sm text-stone-500">
            Manage categories and products for i-BAN Perfumes.
          </p>
          <LoginForm nextPath={nextPath} />
        </div>
      </div>
    </div>
  );
}
