import type { Metadata } from 'next';
import Link from 'next/link';
import { logoutAction } from '@/app/admin/actions';
import { isAdminAuthenticated } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/products', label: 'Products' },
] as const;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated().catch(() => false);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      {authed ? (
        <div className="mx-auto flex min-h-screen max-w-7xl gap-0 md:gap-8 md:px-6 md:py-8">
          <aside className="hidden w-56 shrink-0 rounded-2xl border border-stone-200 bg-white p-5 md:block">
            <p className="font-tenor text-lg tracking-wide text-stone-900">
              i-BAN Admin
            </p>
            <nav className="mt-8 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-amber-50 hover:text-amber-800"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/"
                className="mt-4 rounded-lg px-3 py-2 text-sm text-stone-400 transition-colors hover:text-stone-700"
              >
                View storefront
              </Link>
              <form action={logoutAction} className="mt-2">
                <button
                  type="submit"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-800"
                >
                  Log out
                </button>
              </form>
            </nav>
          </aside>
          <div className="flex-1">
            <header className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3 md:hidden">
              <p className="font-medium text-stone-900">i-BAN Admin</p>
              <form action={logoutAction}>
                <button type="submit" className="text-sm text-stone-500">
                  Log out
                </button>
              </form>
            </header>
            <nav className="flex gap-2 overflow-x-auto border-b border-stone-200 bg-white px-4 py-2 md:hidden">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="whitespace-nowrap rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-700"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <main className="p-4 md:p-0">{children}</main>
          </div>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}
