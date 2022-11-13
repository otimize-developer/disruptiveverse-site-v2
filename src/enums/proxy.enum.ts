export const PROXY_SECRET = process.env.NEXT_PUBLIC_SECRET || 'secret';
export const PROXY_DATE_SECRET = `${PROXY_SECRET}-date`;
export const PROXY_AUTH_TEXT = process.env.NEXT_PUBLIC_AUTH_TEXT || 'auth-text';
export const PROXY_EXPIRE_TOKEN_SECONDS =
  process.env.NEXT_PUBLIC_TOKEN_SECONDS || 15;
