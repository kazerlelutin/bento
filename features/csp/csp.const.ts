export function getCspRules(apiOrigin: string): string[] {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://analytics.ben-to.fr",
    "style-src 'self'",
    `img-src 'self' data: blob: ${apiOrigin} https://ko-fi.com`,
    "font-src 'self'",
    `connect-src 'self' https://ko-fi.com https://ben-to.fr https://analytics.ben-to.fr ${apiOrigin}`,
    "worker-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];
}

/** Chaîne unique pour la meta CSP (SSG + client). */
export function getCspMetaContent(apiOrigin: string): string {
  return getCspRules(apiOrigin).join("; ");
}

export const CSP_META_SELECTOR = 'meta[http-equiv="Content-Security-Policy"]';
