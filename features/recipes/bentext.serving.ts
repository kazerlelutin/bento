import type { Ingredient, Recipe } from "@features/recipes/recipe.type";
import { formatQuantity } from "@features/card/card.utils";

/** Découpe un source bentext en blocs séparés par une ligne `---` (spécification bentext). */
export function splitBentextIntoSections(source: string): string[] {
  const text = source.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  return text.split(/\n---\n/).map((s) => s.trim());
}

function formatIngredientSegment(ing: Ingredient, scale: number): string {
  const q = formatQuantity(ing.quantity * scale);
  if (ing.note && ing.note.trim()) {
    return `${ing.name}|${q}|${ing.unit}|${ing.note}`;
  }
  return `${ing.name}|${q}|${ing.unit}`;
}

/** Une ligne ingrédient bentext (avec alternatives ` ~ ` si présentes). */
export function formatIngredientBentextLine(ing: Ingredient, scale: number): string {
  const parts = [formatIngredientSegment(ing, scale)];
  for (const alt of ing.alternative ?? []) {
    parts.push(formatIngredientSegment(alt, scale));
  }
  return parts.join(" ~ ");
}

export function buildScaledIngredientsSection(recipe: Recipe, scale: number): string {
  const lines = (recipe.ingredients ?? []).map((ing) => formatIngredientBentextLine(ing, scale));
  return lines.join("\n");
}

/**
 * Remplace la ligne « portions » de l’identité et régénère le bloc ingrédients
 * pour refléter `targetServings` (comme sur la fiche).
 * Si le fichier n’a pas au moins 3 blocs (identité, ingrédients, étapes), retourne le texte inchangé.
 */
export function applyServingToBentext(source: string, recipe: Recipe, targetServings: number): string {
  const sections = splitBentextIntoSections(source);
  if (sections.length < 3) return source;

  const base = recipe.identity.servings || 1;
  const scale = targetServings / base;

  const identityLines = sections[0].split("\n");
  if (identityLines.length >= 2) {
    identityLines[1] = String(Math.max(1, Math.round(targetServings)));
  }
  sections[0] = identityLines.join("\n");
  sections[1] = buildScaledIngredientsSection(recipe, scale);

  return sections.join("\n---\n");
}
