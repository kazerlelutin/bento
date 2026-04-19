import { parseLocalizedPath, normalizePathname } from "@features/i18n/route-path";
import type { Route } from "@features/routes/routes.type";
import { getTranslation } from "@features/translate/translate.utils";
import { cardPageCtrl } from "@features/routes/card/card.ctrl";
import recipesListCtrl from "@features/routes/recipes/recipes-list.ctrl";
import aboutCtrl from "@features/routes/about/about.ctrl";
import { privacyPageTitle } from "@features/routes/privacy/privacy.const";
import privacyCtrl from "@features/routes/privacy/privacy.ctrl";
import notFoundCtrl from "@features/routes/not-found/not-found.ctrl";

export type ResolvedRoute = {
  route: Route;
  lang: import("@features/translate/translate.types").Language;
  recipeSlug?: string;
};

const titles = {
  home: "BEN(TO)",
  recipes: "Toutes les recettes",
  about: "À propos",
  recipe: "Recette",
  notFound: "404",
} as const;

export const NOT_FOUND_TEMPLATE_ID = "not-found-template" as const;

function routeHome(lang: import("@features/translate/translate.types").Language): ResolvedRoute {
  return {
    route: {
      path: `/${lang}`,
      title: titles.home,
      templateId: "card",
      ctrl: cardPageCtrl,
    },
    lang,
  };
}

function routeRecipesList(lang: import("@features/translate/translate.types").Language): ResolvedRoute {
  return {
    route: {
      path: `/${lang}/recipes`,
      title: titles.recipes,
      templateId: "recipes-template",
      ctrl: recipesListCtrl,
    },
    lang,
  };
}

function routeAbout(lang: import("@features/translate/translate.types").Language): ResolvedRoute {
  return {
    route: {
      path: `/${lang}/about`,
      title: titles.about,
      templateId: "about-template",
      ctrl: aboutCtrl,
    },
    lang,
  };
}

function routePrivacy(lang: import("@features/translate/translate.types").Language): ResolvedRoute {
  return {
    route: {
      path: `/${lang}/privacy`,
      title: getTranslation(privacyPageTitle, lang),
      templateId: "privacy-template",
      ctrl: privacyCtrl,
    },
    lang,
  };
}

function routeRecipe(
  lang: import("@features/translate/translate.types").Language,
  slug: string
): ResolvedRoute {
  return {
    route: {
      path: `/${lang}/recipes/${slug}`,
      title: titles.recipe,
      templateId: "card",
      ctrl: cardPageCtrl,
    },
    lang,
    recipeSlug: slug,
  };
}

function routeNotFound(
  lang: import("@features/translate/translate.types").Language,
  pathname: string
): ResolvedRoute {
  return {
    route: {
      path: pathname,
      title: titles.notFound,
      templateId: NOT_FOUND_TEMPLATE_ID,
      ctrl: notFoundCtrl,
    },
    lang,
  };
}

/**
 * Résout pathname -> route SPA. Retourne null si le chemin n’a pas de préfixe langue.
 * Les chemins `/{lang}/…` non reconnus mènent à la page 404.
 */
export function resolveRoute(pathname: string): ResolvedRoute | null {
  const p = normalizePathname(pathname);
  const parsed = parseLocalizedPath(p);
  if (!parsed) return null;

  const { lang, segments } = parsed;

  if (segments.length === 0) {
    return routeHome(lang);
  }

  if (segments[0] === "recipes" && segments.length === 1) {
    return routeRecipesList(lang);
  }

  if (segments[0] === "recipes" && segments.length === 2 && segments[1]) {
    return routeRecipe(lang, segments[1]!);
  }

  if (segments[0] === "about" && segments.length === 1) {
    return routeAbout(lang);
  }

  if (segments[0] === "privacy" && segments.length === 1) {
    return routePrivacy(lang);
  }

  return routeNotFound(lang, p);
}
