import { redirect } from 'next/navigation';
import { LoginForm } from '@/app/admin/login/LoginForm';
import { isAdminAuthenticated } from '@/lib/auth';

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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="font-tenor text-2xl text-stone-900">Admin sign in</h1>
        <p className="mt-2 text-sm text-stone-500">
          Manage categories and products for i-BAN Perfumes.
        </p>
        <LoginForm nextPath={nextPath} />
      </div>
    </div>
  );
}
