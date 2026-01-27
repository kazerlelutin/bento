export function getCspRules(apiOrigin: string): string[] {
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    `img-src 'self' data: blob: ${apiOrigin} https://ko-fi.com`,
    "font-src 'self'",
    `connect-src 'self' https://ko-fi.com https://ben-to.fr ${apiOrigin}`,
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];
}

export const CSP_META_SELECTOR = 'meta[http-equiv="Content-Security-Policy"]';
