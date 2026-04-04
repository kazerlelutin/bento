import { getTranslation } from "@features/translate/translate.utils";
import { META, UI } from "@features/translate/translate.const";
import type { Language } from "@features/translate/translate.types";
import type { Recipe } from "@features/recipes/recipe.type";

export type SsgPageKind = "home" | "recipes" | "about" | "recipe";

export type SsgPageMeta = {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  ogLocale: string;
  ogType: string;
  htmlLang: string;
  contentLanguage: string;
};

function siteBase(): string {
  return (process.env.PUBLIC_SITE_URL ?? "https://ben-to.fr").replace(/\/$/, "");
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function pathForPage(lang: Language, kind: SsgPageKind, recipeSlug?: string): string {
  if (kind === "home") return `/${lang}`;
  if (kind === "recipes") return `/${lang}/recipes`;
  if (kind === "about") return `/${lang}/about`;
  return `/${lang}/recipes/${encodeURIComponent(recipeSlug ?? "")}`;
}

/** Images OG statiques (à placer dans public/). */
export function ogImageHome(site: string): string {
  return `${site}/public/og-home.png`;
}

export function ogImageRecipeFallback(site: string): string {
  return `${site}/public/og-recipe-default.png`;
}

export function buildSsgPageMeta(
  lang: Language,
  kind: SsgPageKind,
  options?: { recipe?: Recipe }
): SsgPageMeta {
  const site = siteBase();
  const path = pathForPage(lang, kind, options?.recipe?.slug);
  const canonical = `${site}${path}`;

  const metaOgLocale = getTranslation(META["meta-og-locale"], lang);
  const htmlLang = getTranslation(META["meta-content-language"], lang);
  const contentLanguage = htmlLang;

  const keywordsDefault = getTranslation(META["meta-keywords"], lang);

  if (kind === "recipe" && options?.recipe) {
    const r = options.recipe;
    const title = `${r.identity.name} | BENTO`;
    const desc =
      r.identity.description.length > 200 ? `${r.identity.description.slice(0, 197)}…` : r.identity.description;
    const img = r.image?.url?.startsWith("http")
      ? r.image.url
      : r.image?.url
        ? `${site}${r.image.url.startsWith("/") ? "" : "/"}${r.image.url}`
        : ogImageRecipeFallback(site);
    const alt = r.identity.name;
    return {
      title: esc(title),
      description: esc(desc),
      keywords: esc(keywordsDefault),
      canonical,
      ogTitle: esc(title),
      ogDescription: esc(desc),
      ogImage: img,
      ogImageAlt: esc(alt),
      ogLocale: metaOgLocale,
      ogType: "article",
      htmlLang,
      contentLanguage,
    };
  }

  const title = getTranslation(META["meta-title"], lang);
  const description = getTranslation(META["meta-description"], lang);
  const ogTitle = getTranslation(META["meta-og-title"], lang);
  const ogDescription = getTranslation(META["meta-og-description"], lang);
  const ogImageAlt = getTranslation(META["meta-og-image-alt"], lang);

  const titleRecipes = getTranslation(UI["all-recipes"], lang);
  const titleAbout = getTranslation(UI.about, lang);

  const pageTitle =
    kind === "recipes" ? `${titleRecipes} | BENTO` : kind === "about" ? `${titleAbout} | BENTO` : title;

  return {
    title: esc(pageTitle),
    description: esc(description),
    keywords: esc(keywordsDefault),
    canonical,
    ogTitle: esc(kind === "home" ? ogTitle : pageTitle),
    ogDescription: esc(description),
    ogImage: ogImageHome(site),
    ogImageAlt: esc(ogImageAlt),
    ogLocale: metaOgLocale,
    ogType: "website",
    htmlLang,
    contentLanguage,
  };
}
