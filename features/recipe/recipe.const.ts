import type { Base } from "./recipe.types";
import onigiriBase from "./bases/onigiri.json";
import empanada from "./bases/empanada.json";
import cake from "./bases/cake.json";
import gimbap from "./bases/gimbap.json";
import savoyCake from "./bases/savoy_cake.json";

export const bases: Map<string, Base> = new Map(
  [
    ['onigiri', onigiriBase],
    ['empanada', empanada],
    ['gimbap', gimbap],
    ['cake', cake],
    ['savoy_cake', savoyCake],
  ]
);





