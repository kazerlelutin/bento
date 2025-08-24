import type { Base } from "./recipe.types";
import onigiriBase from "./bases/onigiri.json";
import empanada from "./bases/empanada.json";
import cake from "./bases/cake.json";
import gimbap from "./bases/gimbap.json";

export const bases: Map<string, Base> = new Map(
  [
    ['onigiri', onigiriBase],
    ['empanada', empanada],
    ['gimbap', gimbap],
    ['cake', cake],
  ]
);





