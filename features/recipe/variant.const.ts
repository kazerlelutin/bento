import type { Base } from "./recipe.types";

import onigiriKimchi from "./variants/onigiri_kimchi.json";
import cakeLemon from "./variants/cake_lemon.json";
import cakeOrange from "./variants/cake_orange.json";
import ricottaSpinach from "./variants/ricotta_spinach.json";
import empanadaKimchi from "./variants/empanada_kimchi.json";
import empanadaBlackBeans from "./variants/empanada_black_beans.json";
import gimbapVegetables from "./variants/gimbap_vegetables.json";


export const variants: Map<string, Map<string, Base>> = new Map(
  [
    ['empanada',
      new Map([
        ['kimchi', empanadaKimchi],
        ['black_beans', empanadaBlackBeans],
        ['ricotta_spinach', ricottaSpinach],
      ])
    ],
    ['onigiri',
      new Map([
        ['kimchi', onigiriKimchi],
      ])
    ],
    ['gimbap',
      new Map([
        ['vegetables', gimbapVegetables],
      ])
    ],
    ['cake',
      new Map([
        ['lemon', cakeLemon],
        ['orange', cakeOrange],
      ])
    ]
  ]
);

