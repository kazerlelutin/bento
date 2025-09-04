import type { Step } from "./recipe.types";

import addStep from "./steps/add.json";
import meltButterWater from "./steps/melt_butter_water.json";
import bakeCake from "./steps/bake_cake.json";
import chopKimchi from "./steps/chop_kimchi.json";
import chopOnion from "./steps/chop_onion.json";
import coolMixture from "./steps/cool_mixture.json";
import cookBlackBeans from "./steps/cook_black_beans.json";
import cookRice from "./steps/cook_rice.json";
import cookRiceOnigiri from "./steps/cook_rice_onigiri.json";
import cookVeggieFilling from "./steps/cook_veggie_filling.json";
import cutCircles from "./steps/cut_circles.json";
import fillEmpanadas from "./steps/fill_empanadas.json";
import grateMozzarella from "./steps/grate_mozzarella.json";
import kneadDough from "./steps/knead_dough.json";
import meltButter from "./steps/melt_butter.json";
import meltFat from "./steps/melt_fat.json";
import mixButterSugar from "./steps/mix_butter_sugar.json";
import mixDough from "./steps/mix_dough.json";
import mixDoughEmpanada from "./steps/mix_dough_empanada.json";
import mixFilling from "./steps/mix_filling.json";
import prepareMold from "./steps/prepare_mold.json";
import prepareVeggieFilling from "./steps/prepare_veggie_filling.json";
import prepareRicottaSpinachFilling from "./steps/prepare_ricotta_spinach_filling.json";
import chopSmallDice from "./steps/chop_small_dice.json";
import restDough from "./steps/rest_dough.json";
import restDoughEmpanada from "./steps/rest_dough_empanada.json";
import rollDough from "./steps/roll_dough.json";
import seasonRice from "./steps/season_rice.json";
import shapeOnigiri from "./steps/shape_onigiri.json";
import shapeOnigiriKimchi from "./steps/shape_onigiri_kimchi.json";
import unmoldCool from "./steps/unmold_cool.json";
import washRice from "./steps/wash_rice.json";
import washRiceOnigiri from "./steps/wash_rice_onigiri.json";
import cutJulienne from "./steps/cut_julienne.json";
import rollGimbap from "./steps/roll_gimbap.json";
import seasonRiceVinegar from "./steps/season_rice_vinegar.json";
import shapeEmpanadas from "./steps/shape_empanadas.json";
import brushEggYolk from "./steps/brush_egg_yolk.json";
import bakeEmpanadas from "./steps/bake_empanadas.json";
import preheatOven from "./steps/preheat_oven.json";
import prepareMoldButterFlour from "./steps/prepare_mold_butter_flour.json";
import siftFlourCornstarch from "./steps/sift_flour_cornstarch.json";
import beatEggYolksSugar from "./steps/beat_egg_yolks_sugar.json";
import whipEggWhites from "./steps/whip_egg_whites.json";
import foldMeringueSabayon from "./steps/fold_meringue_sabayon.json";
import pourBatterMold from "./steps/pour_batter_mold.json";
import bakeSavoyCake from "./steps/bake_savoy_cake.json";
import dustIcingSugar from "./steps/dust_icing_sugar.json";
import zestLemon from "./steps/zest_lemon.json";
import addLemonZest from "./steps/add_lemon_zest.json";
import addVanilla from "./steps/add_vanilla.json";

export const steps: Map<string, Step> = new Map(
  [
    ['add', addStep],
    ['melt_butter_water', meltButterWater],
    ['bake_cake', bakeCake],
    ['chop_kimchi', chopKimchi],
    ['chop_onion', chopOnion],
    ['cool_mixture', coolMixture],
    ['cook_black_beans', cookBlackBeans],
    ['cook_rice', cookRice],
    ['cook_rice_onigiri', cookRiceOnigiri],
    ['cook_veggie_filling', cookVeggieFilling],
    ['cut_circles', cutCircles],
    ['fill_empanadas', fillEmpanadas],
    ['grate_mozzarella', grateMozzarella],
    ['knead_dough', kneadDough],
    ['melt_butter', meltButter],
    ['melt_fat', meltFat],
    ['mix_butter_sugar', mixButterSugar],
    ['mix_dough', mixDough],
    ['mix_dough_empanada', mixDoughEmpanada],
    ['mix_filling', mixFilling],
    ['prepare_mold', prepareMold],
    ['prepare_veggie_filling', prepareVeggieFilling],
    ['prepare_ricotta_spinach_filling', prepareRicottaSpinachFilling],
    ['chop_small_dice', chopSmallDice],
    ['rest_dough', restDough],
    ['rest_dough_empanada', restDoughEmpanada],
    ['roll_dough', rollDough],
    ['season_rice', seasonRice],
    ['shape_onigiri', shapeOnigiri],
    ['shape_onigiri_kimchi', shapeOnigiriKimchi],
    ['unmold_cool', unmoldCool],
    ['wash_rice', washRice],
    ['wash_rice_onigiri', washRiceOnigiri],
    ['cut_julienne', cutJulienne],
    ['roll_gimbap', rollGimbap],
    ['season_rice_vinegar', seasonRiceVinegar],
    ['shape_empanadas', shapeEmpanadas],
    ['brush_egg_yolk', brushEggYolk],
    ['bake_empanadas', bakeEmpanadas],
    ['preheat_oven', preheatOven],
    ['prepare_mold_butter_flour', prepareMoldButterFlour],
    ['sift_flour_cornstarch', siftFlourCornstarch],
    ['beat_egg_yolks_sugar', beatEggYolksSugar],
    ['whip_egg_whites', whipEggWhites],
    ['fold_meringue_sabayon', foldMeringueSabayon],
    ['pour_batter_mold', pourBatterMold],
    ['bake_savoy_cake', bakeSavoyCake],
    ['dust_icing_sugar', dustIcingSugar],
    ['zest_lemon', zestLemon],
    ['add_lemon_zest', addLemonZest],
    ['add_vanilla', addVanilla],
  ]
);




