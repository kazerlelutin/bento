export const LOAD_ERROR_KEY = "recipes-load-error";

export const DEFAULT_API_BASE = "https://bentext.ben-to.fr/api";

/** Base API bentext ; une chaîne vide (ex. ARG Docker non fourni) retombe sur la prod par défaut. */
export function resolvePublicBentextApiUrl(): string {
  const raw = process.env.PUBLIC_BENTEXT_API_URL;
  if (typeof raw === "string" && raw.trim() !== "") return raw.trim();
  return DEFAULT_API_BASE;
}
