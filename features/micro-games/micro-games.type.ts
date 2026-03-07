import { Ctrl } from "../routes/routes.type";

export type MicroGame = {
  id: string;
  name: string;
  /** Clé de traduction (UI) pour le texte des consignes affiché sur l'écran 1 */
  instructionKey: string;
  durationMs?: number;
  run(container: HTMLElement): Promise<{ win: boolean }>;
};

export type MicroGamesCtrl = Ctrl & {
  /**
   * @description Spin the wheel
   * @returns {boolean} true if the wheel is spun. If false, you can trigger another action
   */
  spinTheWheel: () => boolean;

  /**
   * @description Reset the number of spins
   */
  resetNumOfSpins: () => void;

  /**
   * @description Ouvre l'overlay des mini-jeux
   */
  openOverlay: () => void;

  /**
   * @description Ferme l'overlay des mini-jeux
   */
  closeOverlay: () => void;

  /**
   * @description Lance un mini-jeu (aléatoire ou par id), charge le sprite si besoin, affiche consignes puis jeu puis résultat
   */
  runGame: (gameId?: string) => Promise<void>;

  /** @internal Phase jeu après clic sur Commencer */
  _runGamePhase: () => Promise<void>;
};