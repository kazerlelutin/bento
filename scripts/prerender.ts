#!/usr/bin/env bun
/**
 * SSG : génère les HTML par langue et par page à partir de dist/index.html (build Bun).
 * Échec du fetch API ⇒ process.exit(1).
 */
import { readFile, writeFile, mkdir, copyFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { fetchRecipesForLang } from "../features/recipes/recipes.fetch.ts";
import { getCspMetaContent } from "../features/csp/csp.const.ts";
import { buildSsgPageMeta, type SsgPageKind } from "../features/meta/ssg-meta.ts";
import type { Language } from "../features/translate/translate.types.ts";
import { resolvePublicBentextApiUrl } from "../features/recipes/recipes.const.ts";
import type { Recipe } from "../features/recipes/recipe.type.ts";
import type { BentoInitialState } from "../features/recipes/bento-initial-state.type.ts";
import {
  buildSsgMainOuterHtml,
  injectSsgMainFragment,
  pickSsgHomeRecipe,
} from "../features/ssg/ssg-render-main.ts";

const LANGS: Language[] = ["fr", "en", "ko", "ch"];

function getApiOrigin(): string {
  try {
    return new URL(resolvePublicBentextApiUrl()).origin;
  } catch {
    return new URL("https://bentext.ben-to.fr/api").origin;
  }
}

function siteUrl(): string {
  return (process.env.PUBLIC_SITE_URL ?? "https://ben-to.fr").replace(/\/$/, "");
}

function normalizeBundledAssets(html: string): string {
  return html.replaceAll('href="./', 'href="/').replaceAll('src="./', 'src="/');
}

function localizeNavLinks(html: string, lang: string): string {
  return html
    .replace(/href="\/about"/g, `href="/${lang}/about"`)
    .replace(/href="\/privacy"/g, `href="/${lang}/privacy"`)
    .replace(/href="\/recipes"/g, `href="/${lang}/recipes"`)
    .replace(/href="\/"/g, `href="/${lang}"`);
}

type PageMetaLike = ReturnType<typeof buildSsgPageMeta>;

function patchHead(html: string, meta: PageMetaLike, cspContent: string): string {
  let out = html;
  out = out.replace(/<html lang="[^"]*"/, `<html lang="${meta.htmlLang}"`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  out = out.replace(
    /<meta name="description"\s*\n\s*content="[^"]*"\s*\/>/,
    `<meta name="description"\n    content="${meta.description}" />`
  );
  if (!out.includes(`content="${meta.description}"`)) {
    out = out.replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${meta.description}" />`);
  }
  out = out.replace(
    /<meta name="keywords"\s*\n\s*content="[^"]*"\s*\/>/,
    `<meta name="keywords"\n    content="${meta.keywords}" />`
  );
  if (!out.includes(`content="${meta.keywords}"`)) {
    out = out.replace(/<meta name="keywords"[^>]*\/>/, `<meta name="keywords" content="${meta.keywords}" />`);
  }
  out = out.replace(
    /<meta http-equiv="content-language" content="[^"]*"\s*\/>/,
    `<meta http-equiv="content-language" content="${meta.contentLanguage}" />`
  );
  out = out.replace(
    /<meta http-equiv="Content-Security-Policy" content="[^"]*"\s*\/>/,
    `<meta http-equiv="Content-Security-Policy" content="${cspContent.replace(/"/g, "&quot;")}" />`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${meta.ogTitle}" />`
  );
  out = out.replace(
    /<meta property="og:description"\s*\n\s*content="[^"]*"\s*\/>/,
    `<meta property="og:description"\n    content="${meta.ogDescription}" />`
  );
  out = out.replace(
    /<meta property="og:type" content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${meta.ogType}" />`
  );
  out = out.replace(
    /<meta property="og:locale" content="[^"]*"\s*\/>/,
    `<meta property="og:locale" content="${meta.ogLocale}" />`
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${meta.ogTitle}" />`
  );
  out = out.replace(
    /<meta name="twitter:description"\s*\n\s*content="[^"]*"\s*\/>/,
    `<meta name="twitter:description"\n    content="${meta.ogDescription}" />`
  );
  out = out.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${meta.ogImage}" />`
  );
  out = out.replace(
    /<meta name="twitter:image:alt" content="[^"]*"\s*\/>/,
    `<meta name="twitter:image:alt" content="${meta.ogImageAlt}" />`
  );
  out = out.replace(
    /<meta name="og:image" content="[^"]*"\s*\/>/,
    `<meta name="og:image" content="${meta.ogImage}" />`
  );
  out = out.replace(
    /<meta name="og:image:alt" content="[^"]*"\s*\/>/,
    `<meta name="og:image:alt" content="${meta.ogImageAlt}" />`
  );

  const inject = `
  <link rel="canonical" href="${meta.canonical}" />
  <meta property="og:url" content="${meta.canonical}" />
`;
  out = out.replace("</head>", `${inject}</head>`);
  return out;
}

function injectInitialState(html: string, state: object): string {
  const json = JSON.stringify(state).replace(/</g, "\\u003c");
  const script = `<script type="application/json" id="bento-initial-state">${json}</script>\n`;
  return html.replace("</head>", `${script}</head>`);
}

async function writeSitemap(urls: string[]): Promise<void> {
  const base = siteUrl();
  const today = new Date().toISOString().split("T")[0];
  const body = urls
    .sort()
    .map(
      (path) => `  <url>
    <loc>${base}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
  await writeFile(join(process.cwd(), "dist", "sitemap.xml"), xml, "utf8");
  console.log("✅ dist/sitemap.xml");
}

async function ensureOgPlaceholders(): Promise<void> {
  const pub = join(process.cwd(), "public");
  const src = join(pub, "og-img.png");
  const home = join(pub, "og-home.png");
  const rec = join(pub, "og-recipe-default.png");
  try {
    if (existsSync(src) && !existsSync(home)) {
      await copyFile(src, home);
      console.log("✅ Copied public/og-img.png → og-home.png");
    }
    if (existsSync(src) && !existsSync(rec)) {
      await copyFile(src, rec);
      console.log("✅ Copied public/og-img.png → og-recipe-default.png");
    }
  } catch (e) {
    console.warn("⚠️ OG placeholders:", e);
  }
}

async function main(): Promise<void> {
  const distIndex = join(process.cwd(), "dist", "index.html");
  if (!existsSync(distIndex)) {
    console.error("❌ dist/index.html manquant — lancez le build Bun avant le prerender.");
    process.exit(1);
  }

  await ensureOgPlaceholders();

  const rawTemplate = await readFile(distIndex, "utf8");
  const csp = getCspMetaContent(getApiOrigin());

  const allUrls: string[] = [];
  const recipesByLang = new Map<Language, Recipe[]>();

  for (const lang of LANGS) {
    const result = await fetchRecipesForLang(lang);
    if (!result.ok) {
      console.error(`❌ Fetch recettes échoué pour ${lang}`);
      process.exit(1);
    }
    recipesByLang.set(lang, result.recipes);
  }

  for (const lang of LANGS) {
    const recipes = recipesByLang.get(lang)!;

    const baseDir = join(process.cwd(), "dist", lang);
    await mkdir(join(baseDir, "recipes"), { recursive: true });
    await mkdir(join(baseDir, "about"), { recursive: true });
    await mkdir(join(baseDir, "privacy"), { recursive: true });

    const kinds: { kind: SsgPageKind; recipe?: Recipe }[] = [
      { kind: "home" },
      { kind: "recipes" },
      { kind: "about" },
      { kind: "privacy" },
      ...recipes.map((r) => ({ kind: "recipe" as const, recipe: r })),
    ];

    for (const { kind, recipe } of kinds) {
      const homeRecipeSsg = kind === "home" ? pickSsgHomeRecipe(recipes) : null;
      const initialState: BentoInitialState = {
        recipes,
        loadError: null,
        lang,
        ...(homeRecipeSsg ? { homeRecipeSlug: homeRecipeSsg.slug } : {}),
      };

      const meta = buildSsgPageMeta(lang, kind, recipe ? { recipe } : undefined);
      let html = normalizeBundledAssets(rawTemplate);
      html = patchHead(html, meta, csp);
      html = injectInitialState(html, initialState);
      html = localizeNavLinks(html, lang);

      let mainOuter: string | null = null;
      if (kind === "home" && homeRecipeSsg) {
        mainOuter = buildSsgMainOuterHtml(html, "home", lang, recipes, null);
      } else if (kind === "recipes") {
        mainOuter = buildSsgMainOuterHtml(html, "recipes", lang, recipes, null);
      } else if (kind === "recipe" && recipe) {
        mainOuter = buildSsgMainOuterHtml(html, "recipe", lang, recipes, recipe);
      }
      if (mainOuter) {
        html = injectSsgMainFragment(html, mainOuter);
      }

      if (kind === "home") {
        await writeFile(join(baseDir, "index.html"), html, "utf8");
        allUrls.push(`/${lang}`);
        console.log(`✅ ${lang}/index.html`);
      } else if (kind === "recipes") {
        await writeFile(join(baseDir, "recipes", "index.html"), html, "utf8");
        allUrls.push(`/${lang}/recipes`);
        console.log(`✅ ${lang}/recipes/index.html`);
      } else if (kind === "about") {
        await writeFile(join(baseDir, "about", "index.html"), html, "utf8");
        allUrls.push(`/${lang}/about`);
        console.log(`✅ ${lang}/about/index.html`);
      } else if (kind === "privacy") {
        await writeFile(join(baseDir, "privacy", "index.html"), html, "utf8");
        allUrls.push(`/${lang}/privacy`);
        console.log(`✅ ${lang}/privacy/index.html`);
      } else if (recipe) {
        const safe = recipe.slug.replace(/[^a-zA-Z0-9._-]/g, "_");
        await writeFile(join(baseDir, "recipes", `${safe}.html`), html, "utf8");
        allUrls.push(`/${lang}/recipes/${encodeURIComponent(recipe.slug)}`);
        console.log(`✅ ${lang}/recipes/${safe}.html`);
      }
    }
  }

  await writeSitemap(allUrls);
  console.log("🎉 Prerender terminé.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
