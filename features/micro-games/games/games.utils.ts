import * as ingredientSprite from "@features/ingredient-sprite/ingredient-sprite";

export const GAME_ABORTED = "MICRO_GAME_ABORTED";

export function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Crée un bouton affichant le sprite d'un ingrédient (alias).
 * Utilisé par les mini-jeux qui proposent des choix d'ingrédients.
 */
export function createSpriteButton(
  alias: string,
  onClick: () => void
): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.setAttribute("aria-label", capitalizeFirst(alias));
  btn.setAttribute("data-alias", alias);
  ingredientSprite.applySprite(btn, alias);
  btn.addEventListener("click", onClick);
  return btn;
}

export function withGameTimeout(
  durationMs: number,
  run: (finish: (win: boolean) => void) => void
): Promise<{ win: boolean }> {
  return new Promise((resolve) => {
    let resolved = false;
    function finish(win: boolean) {
      if (resolved) return;
      resolved = true;
      window.clearTimeout(timerId);
      resolve({ win });
    }
    const timerId = window.setTimeout(() => finish(false), durationMs);
    run(finish);
  });
}
