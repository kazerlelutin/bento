import type { MicroGame } from "@features/micro-games/micro-games.type";
import { capitalizeFirst, createSpriteButton, withGameTimeout } from "@features/micro-games/games/games.utils";
import * as ingredientSprite from "@features/ingredient-sprite/ingredient-sprite";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";

const DURATION_MS = 5000;
const NUM_CHOICES = 4;

export const clickTheIngredientGame: MicroGame = {
  id: "click-the-ingredient",
  name: t(UI.click_the_ingredient_title),
  instructionKey: "click_the_ingredient_rules",
  durationMs: DURATION_MS,

  run(container: HTMLElement): Promise<{ win: boolean }> {
    return withGameTimeout(DURATION_MS, (finish) => {
      const aliases = ingredientSprite.getRandomAliases(NUM_CHOICES);
      if (aliases.length < NUM_CHOICES) {
        finish(false);
        return;
      }
      const targetIndex = Math.floor(Math.random() * NUM_CHOICES);
      const target = aliases[targetIndex];
      const displayName = capitalizeFirst(target);

      const instructionText = t(UI.click_the_ingredient_instruction).replace("{name}", displayName);
      const p = document.createElement("p");
      p.className = "micro-game-instruction";
      p.setAttribute("aria-live", "polite");
      p.textContent = instructionText;
      container.appendChild(p);

      const buttonsWrapper = document.createElement("div");
      buttonsWrapper.className = "micro-game-content";
      buttonsWrapper.setAttribute("role", "group");
      buttonsWrapper.setAttribute("aria-label", instructionText);

      const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);

      for (const i of order) {
        const alias = aliases[i];
        const btn = createSpriteButton(alias, () => {
          if (alias === target) finish(true);
        });
        buttonsWrapper.appendChild(btn);
      }
      container.appendChild(buttonsWrapper);
    });
  },
};
