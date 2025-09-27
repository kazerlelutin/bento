import type { Base } from "./recipe.types";
import onigiriBase from "./bases/onigiri.json";
import empanada from "./bases/empanada.json";
import cake from "./bases/cake.json";
import gimbap from "./bases/gimbap.json";
import savoyCake from "./bases/savoy_cake.json";
import udon from "./bases/udon.json";

export const bases: Map<string, Base> = new Map(
  [
    //Plats
    ['empanada', empanada],
    ['gimbap', gimbap],
    ['onigiri', onigiriBase],
    ['udon', udon],

    // Desserts
    ['cake', cake],
    ['savoy_cake', savoyCake],
  ]
);





