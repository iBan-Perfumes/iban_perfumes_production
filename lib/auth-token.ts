import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_COOKIE = 'iban_admin';
export const SESSION_DAYS = 7;

export function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(email: string) {
  return new SignJWT({ role: 'admin', email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getAuthSecret());
}

export async function verifyAdminToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    if (payload.role !== 'admin') return null;
    return payload;
  } catch {
    return null;
  }
}

export function validateAdminCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL?.trim();
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !expectedPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be configured');
  }
  return email.trim() === expectedEmail && password === expectedPassword;
}
