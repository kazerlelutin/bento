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
