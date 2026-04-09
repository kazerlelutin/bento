import { describe, it, expect } from "bun:test";
import {
  applyServingToBentext,
  buildBentextExportFromRecipe,
  formatIngredientBentextLine,
  splitBentextIntoSections,
} from "./bentext.serving";
import type { Recipe } from "./recipe.type";

const minimalRecipe = (): Recipe => ({
  slug: "x",
  identity: { name: "Cake", description: "Nice.", servings: 4 },
  ingredients: [
    { id: "1", name: "flour", quantity: 200, unit: "g" },
    {
      id: "2",
      name: "milk",
      quantity: 100,
      unit: "ml",
      alternative: [{ id: "2a", name: "water", quantity: 100, unit: "ml" }],
    },
  ],
  steps: ["Mix.", "Bake."],
  notes: [],
  tags: [],
});

describe("bentext.serving", () => {
  it("splitBentextIntoSections splits on ---", () => {
    const s = splitBentextIntoSections("a\n---\nb\n---\nc");
    expect(s).toEqual(["a", "b", "c"]);
  });

  it("formatIngredientBentextLine joins alternatives with ~", () => {
    const r = minimalRecipe();
    const line = formatIngredientBentextLine(r.ingredients[1]!, 1);
    expect(line).toContain("milk|100|ml");
    expect(line).toContain(" ~ ");
    expect(line).toContain("water|100|ml");
  });

  it("applyServingToBentext scales identity servings and ingredient quantities", () => {
    const source = `Cake
4
Nice.

---
flour|200|g
milk|100|ml ~ water|100|ml
---
Mix.
Bake.`;

    const patched = applyServingToBentext(source, minimalRecipe(), 2);
    expect(patched).toContain("\n2\n");
    expect(patched).toContain("flour|100|g");
    expect(patched).toContain("milk|50|ml");
    expect(patched).toContain("water|50|ml");
    expect(patched).toContain("Mix.");
    expect(patched).toContain("Bake.");
  });

  it("returns source unchanged when fewer than 3 sections", () => {
    const short = "only\n---\ntwo";
    expect(applyServingToBentext(short, minimalRecipe(), 2)).toBe(short);
  });

  it("buildBentextExportFromRecipe yields bentext with identity, ingredients, steps", () => {
    const text = buildBentextExportFromRecipe(minimalRecipe());
    const parts = splitBentextIntoSections(text);
    expect(parts.length).toBeGreaterThanOrEqual(3);
    expect(parts[0]).toContain("Cake");
    expect(parts[1]).toContain("flour|200|g");
    expect(parts[2]).toContain("Mix.");
  });

  it("buildBentextExportFromRecipe appends bento block when present", () => {
    const r = minimalRecipe();
    r.bento = { transport: "Facile", eating: "À la main" };
    const text = buildBentextExportFromRecipe(r);
    expect(text).toContain("Transport|Facile");
    expect(text).toContain("Eating|À la main");
  });
});
