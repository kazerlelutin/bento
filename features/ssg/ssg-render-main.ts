/**
 * Prerender SSG : le HTML du `<main>` est produit en clonant les `<template>`
 * de la même page (`index.html` / `dist/index.html`) dans un document happy-dom,
 * puis en réutilisant la logique de remplissage que le navigateur (`card.view-fill`,
 * `recipes-catalog.view-fill`).
 */
import type { Recipe } from "@features/recipes/recipe.type";
import type { Language } from "@features/translate/translate.types";
import { Window } from "happy-dom";
import { applyRecipeToCardDom } from "@features/card/card.view-fill";
import { applyRecipesCatalogToDom } from "@features/routes/recipes/recipes-catalog.view-fill";

/**
 * Sous Bun, le contexte VM de happy-dom peut exposer `globalThis.SyntaxError` (etc.) comme
 * `undefined`, ce qui laisse des intrinsèques dupliqués en `undefined` sur `Window` et casse
 * le parse HTML (p.ex. sélecteurs sur `<select>`). On recopie depuis le `globalThis` hôte.
 * Voir `happy-dom` VMGlobalPropertyScript (liste alignée sur ce module).
 */
function patchHappyDomWindowVmGlobals(win: InstanceType<typeof Window>): void {
  const src = globalThis as unknown as Record<string, unknown>;
  const dst = win as unknown as Record<string, unknown>;
  const keys = [
    "ArrayBuffer",
    "Boolean",
    "DataView",
    "Date",
    "Error",
    "EvalError",
    "Float32Array",
    "Float64Array",
    "Infinity",
    "Intl",
    "JSON",
    "Map",
    "Math",
    "NaN",
    "Number",
    "Object",
    "Promise",
    "RangeError",
    "ReferenceError",
    "RegExp",
    "Reflect",
    "Set",
    "String",
    "Symbol",
    "SyntaxError",
    "TypeError",
    "URIError",
    "Uint16Array",
    "Uint32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "WeakMap",
    "WeakSet",
    "Array",
    "Function",
    "AbortController",
    "AbortSignal",
  ] as const;
  for (const key of keys) {
    const v = src[key];
    if (v !== undefined && dst[key] === undefined) {
      dst[key] = v;
    }
  }
}

/** Première recette stable (tri par slug) pour l’accueil SSG. */
export function pickSsgHomeRecipe(recipes: Recipe[]): Recipe | null {
  if (!recipes.length) return null;
  return [...recipes].sort((a, b) => a.slug.localeCompare(b.slug, "en"))[0] ?? null;
}

export type SsgMainKind = "home" | "recipe" | "recipes";

export function buildSsgMainOuterHtml(
  fullPageHtml: string,
  kind: SsgMainKind,
  lang: Language,
  recipes: Recipe[],
  recipe: Recipe | null
): string {
  const browserWindow = new Window({ url: "https://ben-to.fr/" });
  patchHappyDomWindowVmGlobals(browserWindow);
  const parser = new browserWindow.DOMParser();
  const doc = parser.parseFromString(fullPageHtml, "text/html");
  const main = doc.querySelector("main.app-main");
  if (!main) {
    throw new Error('Prerender SSG : élément <main class="app-main"> introuvable.');
  }

  main.innerHTML = "";
  main.setAttribute("data-ssg", "1");

  if (kind === "recipes") {
    const tpl = doc.getElementById("recipes-template") as HTMLTemplateElement | null;
    if (!tpl?.content) {
      throw new Error("Prerender SSG : template #recipes-template introuvable.");
    }
    const frag = tpl.content.cloneNode(true) as DocumentFragment;
    const first = frag.firstElementChild;
    if (first) main.appendChild(first);
    applyRecipesCatalogToDom(doc, recipes, lang);
  } else {
    const tpl = doc.getElementById("card") as HTMLTemplateElement | null;
    if (!tpl?.content) {
      throw new Error("Prerender SSG : template #card introuvable.");
    }
    const r = recipe ?? pickSsgHomeRecipe(recipes);
    if (!r) {
      return main.outerHTML;
    }
    const frag = tpl.content.cloneNode(true) as DocumentFragment;
    const first = frag.firstElementChild;
    if (first) main.appendChild(first);
    applyRecipeToCardDom(doc, r, lang);
  }

  return main.outerHTML;
}

/** Remplace le `<main class="app-main">…</main>` du HTML par la version prérendue. */
export function injectSsgMainFragment(html: string, mainOuterHtml: string): string {
  const replaced = html.replace(/<main class="app-main">[\s\S]*?<\/main>/, mainOuterHtml);
  if (replaced === html) {
    console.warn('⚠️ injectSsgMainFragment : <main class="app-main"> introuvable, HTML inchangé.');
  }
  return replaced;
}
