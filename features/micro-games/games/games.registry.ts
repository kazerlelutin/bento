import type { MicroGame } from "@features/micro-games/micro-games.type";
import { clickTheIngredientGame } from "@features/micro-games/games/click-the-ingredient";
import { findTheIntruderGame } from "@features/micro-games/games/find-the-intruder";

export const MICRO_GAMES: MicroGame[] = [clickTheIngredientGame, findTheIntruderGame];
