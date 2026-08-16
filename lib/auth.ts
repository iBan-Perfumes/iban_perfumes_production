import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE,
  SESSION_DAYS,
  signAdminToken,
  verifyAdminToken,
} from '@/lib/auth-token';

export { ADMIN_COOKIE, validateAdminCredentials, verifyAdminToken } from '@/lib/auth-token';

export async function createAdminSession(email: string) {
  const token = await signAdminToken(email);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return Boolean(await verifyAdminToken(token));
}
