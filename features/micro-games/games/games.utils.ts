import * as ingredientSprite from "@features/ingredient-sprite/ingredient-sprite";

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

/**
 * Encapsule l'exécution d'un mini-jeu avec un timeout.
 * Le callback reçoit une fonction `finish(win)` à appeler en cas de victoire/défaite (clic utilisateur).
 * Si le temps est écoulé avant tout appel à `finish`, la promesse est résolue avec `{ win: false }`.
 */
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
