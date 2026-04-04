import { describe, it, expect } from "bun:test";
import { resolveRoute } from "@features/router/route-match";

describe("resolveRoute (chemins localisés)", () => {
  it("résout la home /{lang}", () => {
    const r = resolveRoute("/fr");
    expect(r).not.toBeNull();
    expect(r!.lang).toBe("fr");
    expect(r!.route.templateId).toBe("card");
    expect(r!.recipeSlug).toBeUndefined();
  });

  it("résout /{lang}/recipes", () => {
    const r = resolveRoute("/en/recipes");
    expect(r).not.toBeNull();
    expect(r!.lang).toBe("en");
    expect(r!.route.templateId).toBe("recipes-template");
  });

  it("résout /{lang}/about", () => {
    const r = resolveRoute("/ko/about");
    expect(r).not.toBeNull();
    expect(r!.route.templateId).toBe("about-template");
  });

  it("résout /{lang}/recipes/:slug", () => {
    const r = resolveRoute("/fr/recipes/tarte-pommes");
    expect(r).not.toBeNull();
    expect(r!.recipeSlug).toBe("tarte-pommes");
    expect(r!.route.templateId).toBe("card");
  });

  it("retourne null pour un chemin sans langue", () => {
    expect(resolveRoute("/recipes")).toBeNull();
    expect(resolveRoute("/")).toBeNull();
  });
});
