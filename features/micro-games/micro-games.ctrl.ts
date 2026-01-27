import {
  CLOSE_BTN_ID,
  CONSIGNES_TEXT_ID,
  COOLDOWN_MS,
  MIN_REJECTS,
  RESULT_MESSAGE_ID,
  RESULT_SCORE_ID,
  SPIN_CHANCE,
  START_BTN_ID,
  TITLE_ID,
  TIMER_BAR_ID,
} from "@features/micro-games/micro-games.const";
import {
  focusCloseBtn,
  focusStartBtn,
  getContainer,
  getFocusables,
  getOverlay,
  handleFocusTrap,
  setPhase,
} from "@features/micro-games/micro-games.utils";
import { MicroGamesCtrl } from "@features/micro-games/micro-games.type";
import type { MicroGame } from "@features/micro-games/micro-games.type";
import { MICRO_GAMES } from "@features/micro-games/games/games.registry";
import * as ingredientSprite from "@features/ingredient-sprite/ingredient-sprite";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";

let numOfSpins = 0;
let lastSpinTime = 0;
let sessionScore = 0;
let pendingGame: MicroGame | null = null;

export const microGamesCtrl: MicroGamesCtrl = {
  init() {
    const overlay = getOverlay();
    const startBtn = document.getElementById(START_BTN_ID);
    const closeBtn = document.getElementById(CLOSE_BTN_ID);
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        if (pendingGame) microGamesCtrl._runGamePhase();
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        microGamesCtrl.closeOverlay();
      });
    }
    if (overlay) {
      overlay.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          microGamesCtrl.closeOverlay();
          e.preventDefault();
        }
        handleFocusTrap(overlay, e);
      });
    }
  },

  async _runGamePhase() {
    const game = pendingGame;
    const container = getContainer();
    const overlay = getOverlay();
    if (!game || !container) return;
    pendingGame = null;
    setPhase("game");
    container.innerHTML = "";

    const durationMs = game.durationMs ?? 5000;
    const timerBar = document.getElementById(TIMER_BAR_ID);
    if (timerBar) {
      timerBar.setAttribute("aria-label", t(UI.micro_game_time_remaining));
      timerBar.setAttribute("aria-valuenow", "100");
      timerBar.style.width = "100%";
    }

    let timerIntervalId: ReturnType<typeof setInterval> | null = null;
    const startTime = Date.now();
    if (timerBar && durationMs > 0) {
      timerIntervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 1 - elapsed / durationMs);
        const pct = Math.round(remaining * 100);
        timerBar.style.width = `${pct}%`;
        timerBar.setAttribute("aria-valuenow", String(pct));
        if (pct <= 0 && timerIntervalId != null) {
          clearInterval(timerIntervalId);
          timerIntervalId = null;
        }
      }, 50);
    }

    const promise = game.run(container);
    requestAnimationFrame(() => {
      if (overlay) {
        const focusables = getFocusables(overlay);
        focusables[0]?.focus();
      }
    });
    let result: { win: boolean };
    try {
      result = await promise;
    } catch (e) {
      result = { win: false };
    } finally {
      if (timerIntervalId != null) clearInterval(timerIntervalId);
    }
    if (result.win) sessionScore += 1;

    const msgEl = document.getElementById(RESULT_MESSAGE_ID);
    if (msgEl) msgEl.textContent = result.win ? t(UI.micro_game_result_win) : t(UI.micro_game_result_lose);
    const scoreEl = document.getElementById(RESULT_SCORE_ID);
    if (scoreEl) scoreEl.textContent = t(UI.micro_game_session_score).replace("{score}", String(sessionScore));
    const closeBtn = document.getElementById(CLOSE_BTN_ID);
    if (closeBtn && closeBtn instanceof HTMLButtonElement) {
      closeBtn.textContent = t(UI.micro_game_close);
      closeBtn.setAttribute("aria-label", t(UI.micro_game_close));
    }
    setPhase("result");
    focusCloseBtn();
  },

  spinTheWheel() {
    numOfSpins++;
    if (numOfSpins < MIN_REJECTS) return false;
    const now = Date.now();
    if (now - lastSpinTime < COOLDOWN_MS) return false;
    if (Math.random() >= SPIN_CHANCE) return false;
    lastSpinTime = now;
    numOfSpins = 0;
    return true;
  },

  resetNumOfSpins() {
    numOfSpins = 0;
  },

  openOverlay() {
    const overlay = getOverlay();
    if (overlay) overlay.hidden = false;
  },

  closeOverlay() {
    pendingGame = null;
    const overlay = getOverlay();
    if (overlay) overlay.hidden = true;
    const container = getContainer();
    if (container) container.innerHTML = "";
    setPhase("consignes");
  },

  async runGame(gameId?: string) {
    microGamesCtrl.openOverlay();
    const container = getContainer();
    if (!container) {
      microGamesCtrl.closeOverlay();
      return;
    }
    try {
      await ingredientSprite.load();
    } catch (err) {
      console.error("Failed to load ingredient sprite", err);
      microGamesCtrl.closeOverlay();
      return;
    }
    const games = MICRO_GAMES;
    if (games.length === 0) {
      microGamesCtrl.closeOverlay();
      return;
    }
    const game = gameId
      ? games.find((g) => g.id === gameId)
      : games[Math.floor(Math.random() * games.length)];
    if (!game) {
      microGamesCtrl.closeOverlay();
      return;
    }

    pendingGame = game;

    const titleEl = document.getElementById(TITLE_ID);
    if (titleEl) titleEl.textContent = game.name;

    const consignesTextEl = document.getElementById(CONSIGNES_TEXT_ID);
    if (consignesTextEl) {
      const instruction = (UI as Record<string, { fr: string; en?: string; ko?: string }>)[game.instructionKey];
      consignesTextEl.textContent = instruction ? t(instruction) : "";
    }

    const startBtn = document.getElementById(START_BTN_ID);
    if (startBtn && startBtn instanceof HTMLButtonElement) {
      startBtn.textContent = t(UI.micro_game_start);
      startBtn.setAttribute("aria-label", t(UI.micro_game_start));
    }

    setPhase("consignes");
    container.innerHTML = "";
    focusStartBtn();
  },
};
