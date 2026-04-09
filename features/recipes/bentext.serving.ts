import type { Ingredient, Recipe, RecipeBento } from "@features/recipes/recipe.type";
import { formatQuantity } from "@features/card/card.utils";
import {
  BENTO_FIELD_KEYS,
  type BentoFieldKey,
  getBentoFieldValue,
  hasBentoContent,
} from "@features/card/card.bento.utils";

/** Préfixes bentext `Prefix|texte` pour l’export local (aligné API v2). */
const BENTO_EXPORT_PREFIX: Record<BentoFieldKey, string> = {
  transport: "Transport",
  reheat: "Reheat",
  cold: "Cold",
  cover: "Cover",
  eating: "Eating",
  stains: "Stains",
  smell: "Smell",
  prep_time: "Prep_time",
  holding: "Holding",
  extra_notes: "Extra_notes",
};

function formatBentoExportBlock(bento: RecipeBento): string {
  const lines: string[] = [];
  for (const key of BENTO_FIELD_KEYS) {
    const raw = getBentoFieldValue(bento, key);
    if (!raw?.trim()) continue;
    lines.push(`${BENTO_EXPORT_PREFIX[key]}|${raw.trim()}`);
  }
  return lines.join("\n");
}

/**
 * Reconstruit un source bentext depuis le JSON recette (copie / impression sans appel API).
 * Utilisé en secours si `fetchBentext` échoue (réseau, 404, route API).
 */
export function buildBentextExportFromRecipe(recipe: Recipe): string {
  const id = recipe.identity;
  const identityBlock = [id.name, String(Math.max(1, id.servings || 1)), id.description ?? ""].join("\n");
  const ing = buildScaledIngredientsSection(recipe, 1);
  const stepsBlock = (recipe.steps ?? []).join("\n");
  const parts: string[] = [identityBlock, ing, stepsBlock];
  if (recipe.notes?.length) {
    parts.push(recipe.notes.join("\n"));
  }
  if (recipe.tags?.length) {
    parts.push(recipe.tags.join("\n"));
  }
  if (recipe.bento && hasBentoContent(recipe.bento)) {
    parts.push(formatBentoExportBlock(recipe.bento));
  }
  return parts.join("\n---\n");
}

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
