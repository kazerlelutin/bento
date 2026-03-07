import type { MicroGame } from "@features/micro-games/micro-games.type";
import { createSpriteButton, GAME_ABORTED, withGameTimeout } from "@features/micro-games/games/games.utils";
import * as ingredientSprite from "@features/ingredient-sprite/ingredient-sprite";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";

const DURATION_MS = 6000;
const NUM_CHOICES = 4;

/** Alias considérés comme "intrus" (ex. pas un aliment). */
const INTRUDER_ALIASES = ["couvert", 'assiette', "fouet", "baguettes"];

export const findTheIntruderGame: MicroGame = {
  id: "find-the-intruder",
  name: "Find the intruder",
  nameKey: "find_the_intruder_title",
  instructionKey: "find_the_intruder_rules",
  durationMs: DURATION_MS,

  run(container: HTMLElement): Promise<{ win: boolean }> {
    const intruder = INTRUDER_ALIASES.find((a) => ingredientSprite.getPosition(a) != null);
    if (!intruder) {
      return Promise.reject(new Error(GAME_ABORTED));
    }
    let others = ingredientSprite.getRandomAliases(20).filter((a) => a !== intruder);
    if (others.length < NUM_CHOICES - 1) {
      return Promise.reject(new Error(GAME_ABORTED));
    }
    return withGameTimeout(DURATION_MS, (finish) => {
      others = others.slice(0, NUM_CHOICES - 1);
      const choices = [intruder, ...others];
      const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      const shuffled = order.map((i) => choices[i]);

      const instructionText = t(UI.find_the_intruder_instruction);
      const buttonsWrapper = document.createElement("div");
      buttonsWrapper.className = "micro-game-content";
      buttonsWrapper.setAttribute("role", "group");
      buttonsWrapper.setAttribute("aria-label", instructionText);

      for (const alias of shuffled) {
        const btn = createSpriteButton(alias, () => {
          if (alias === intruder) finish(true);
        });
        buttonsWrapper.appendChild(btn);
      }
      container.appendChild(buttonsWrapper);
    });
  },
};
