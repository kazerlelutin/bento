import { META } from "@features/translate/translate.const";

type MetaKey = keyof typeof META;

export const META_SELECTORS: { key: MetaKey; selector: string; attr: string }[] = [
  { key: "meta-description", selector: 'meta[name="description"]', attr: "content" },
  { key: "meta-keywords", selector: 'meta[name="keywords"]', attr: "content" },
  { key: "meta-content-language", selector: 'meta[http-equiv="content-language"]', attr: "content" },
  { key: "meta-og-title", selector: 'meta[property="og:title"]', attr: "content" },
  { key: "meta-og-description", selector: 'meta[property="og:description"]', attr: "content" },
  { key: "meta-og-locale", selector: 'meta[property="og:locale"]', attr: "content" },
  { key: "meta-og-title", selector: 'meta[name="twitter:title"]', attr: "content" },
  { key: "meta-og-description", selector: 'meta[name="twitter:description"]', attr: "content" },
  { key: "meta-og-image-alt", selector: 'meta[name="twitter:image:alt"]', attr: "content" },
  { key: "meta-og-image-alt", selector: 'meta[name="og:image:alt"]', attr: "content" },
];

type NotFoundMetaKey = Extract<
  MetaKey,
  | "meta-not-found-description"
  | "meta-not-found-keywords"
  | "meta-not-found-og-title"
  | "meta-not-found-og-description"
>;

/** Balises meta à remplir sur la page 404 (titre document géré dans `applyNotFoundMeta`). */
export const NOT_FOUND_META_SELECTORS: { key: NotFoundMetaKey; selector: string; attr: string }[] = [
  { key: "meta-not-found-description", selector: 'meta[name="description"]', attr: "content" },
  { key: "meta-not-found-keywords", selector: 'meta[name="keywords"]', attr: "content" },
  { key: "meta-not-found-og-title", selector: 'meta[property="og:title"]', attr: "content" },
  { key: "meta-not-found-og-description", selector: 'meta[property="og:description"]', attr: "content" },
  { key: "meta-not-found-og-title", selector: 'meta[name="twitter:title"]', attr: "content" },
  { key: "meta-not-found-og-description", selector: 'meta[name="twitter:description"]', attr: "content" },
];
