import type { Language } from "@features/translate/translate.types";
import { getApiBaseUrl, getApiLang } from "@features/recipes/recipes.utils";
import { toApiLang } from "./recipes.fetch";

export function escapeHtmlForPre(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Télécharge le source bentext brut pour une recette. `langOverride` = langue d’URL (recommandé, évite un décalage avec le sélecteur). */
export async function fetchBentext(slug: string, langOverride?: Language): Promise<string> {
  const base = getApiBaseUrl();
  const lang = langOverride !== undefined ? toApiLang(langOverride) : getApiLang();
  const url = `${base}/recipes/${lang}/${encodeURIComponent(slug)}?format=bentext`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`bentext ${res.status}`);
  }
  return res.text();
}

export type ShareBentextResult = "shared" | "clipboard" | "cancelled";

/**
 * Partage le bentext via l’API Web Share, avec repli copie (texte + URL).
 * `AbortError` (fermeture de la feuille native) ⇒ `cancelled`.
 */
export async function shareBentextRecipe(options: {
  title: string;
  text: string;
  url: string;
}): Promise<ShareBentextResult> {
  const { title, text, url } = options;
  const combinedForClipboard = `${text}\n\n${url}`;

  if (typeof navigator.share !== "function") {
    await copyTextToClipboard(combinedForClipboard);
    return "clipboard";
  }

  const candidates: ShareData[] = [
    { title, text, url },
    { title, text: `${text}\n\n${url}` },
    { text: `${text}\n\n${url}`, url },
  ];

  for (const data of candidates) {
    if (typeof navigator.canShare === "function" && !navigator.canShare(data)) {
      continue;
    }
    try {
      await navigator.share(data);
      return "shared";
    } catch (e: unknown) {
      if (e && typeof e === "object" && "name" in e && (e as Error).name === "AbortError") {
        return "cancelled";
      }
    }
  }

  await copyTextToClipboard(combinedForClipboard);
  return "clipboard";
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
