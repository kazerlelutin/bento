import { getApiBaseUrl, getApiLang } from "@features/recipes/recipes.utils";

export function escapeHtmlForPre(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Télécharge le source bentext brut pour une recette. */
export async function fetchBentext(slug: string): Promise<string> {
  const base = getApiBaseUrl();
  const lang = getApiLang();
  const url = `${base}/recipes/${lang}/${encodeURIComponent(slug)}?format=bentext`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`bentext ${res.status}`);
  }
  return res.text();
}

export async function copyTextToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
}

/** Ouvre une fenêtre avec le bentext en <pre> et lance l’impression. */
export function printBentextInWindow(text: string, title = "bentext"): void {
  const w = window.open("", "_blank");
  if (!w) return;
  const body = escapeHtmlForPre(text);
  const safeTitle = escapeHtmlForPre(title);
  w.document.open();
  w.document.write(`<!DOCTYPE html><html lang=""><head><meta charset="utf-8"><title>${safeTitle}</title><style>
    body{margin:0;font-family:ui-monospace,Cascadia Code,Consolas,monospace;font-size:10pt;line-height:1.35;}
    pre{margin:12px;white-space:pre-wrap;word-break:break-word;}
  </style></head><body><pre>${body}</pre></body></html>`);
  w.document.close();
  const doPrint = () => {
    try {
      w.focus();
      w.print();
    } catch {
      /* ignore */
    }
  };
  setTimeout(doPrint, 0);
}
