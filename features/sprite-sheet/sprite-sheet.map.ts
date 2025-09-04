import bases from '@public/sprites/bases.png';


export const SPRITE_MAP = new Map<string, string>([
  ['bases', bases],
]);

export const BASES_LAYERS = new Map<string, number>([
  ['back', 0],
  ['front', 1],
  ['empanada', 2],
  ['onigiri', 3],
  ['cake', 4],
  ['gimbap', 5],
  ['savoy_cake', 6],
]);

export const ZONE_LAYERS = new Map<string, [number, number][]>([
  ['onigiri', [[41, 1], [10, 1]]],
  ['gimbap', [[41, 1], [10, 1]]],
  ['cake', [[41, 29], [17, 28]]],
  ['empanada', [[41, 30], [10, 1]]],
  ['savoy_cake', [[41, 28], [10, 28]]],
]);

export const ZONE_LAYERS_MAP = new Map<string, Map<string, {
  form: 'square' | 'circle'
  num: [number, number]
  size: [number, number]
  color: [number, number, number?] // [normalColor, lightColor, shadowColor?]
}>>([
  ['gimbap_vegetables', new Map([
    ['yellow_radish', {
      form: 'square',
      color: [33, 32, 34],
      num: [2, 2],
      size: [6, 9],
    }],
    ['beetroot', {
      form: 'square',
      num: [4, 5],
      color: [18, 17],
      size: [4, 4],
    }],
    ['fermented_beetroot', {
      form: 'square',
      num: [4, 5],
      color: [18, 17],
      size: [4, 4],
    }],
    ['gruyere', {
      form: 'square',
      num: [4, 5],
      color: [29, 28],
      size: [4, 4],
    }],
    ['comte', {
      form: 'square',
      num: [4, 5],
      color: [29, 28],
      size: [4, 4],
    }],
    ['cheddar', {
      form: 'square',
      num: [4, 5],
      color: [24, 25],
      size: [4, 4],
    }],
    ['cucumber', {
      form: 'square',
      num: [4, 5],
      color: [29, 28],
      size: [4, 4],
    }],
    ['red_bell_pepper', {
      form: 'square',
      num: [4, 5],
      color: [26, 25],
      size: [4, 4],
    }],
    ['green_bell_pepper', {
      form: 'square',
      num: [4, 5],
      color: [37, 36],
      size: [4, 4],
    }],
    ['orange_bell_pepper', {
      form: 'square',
      num: [4, 5],
      color: [29, 26],
      size: [4, 4],
    }],
    ['yellow_bell_pepper', {
      form: 'square',
      num: [4, 5],
      color: [29, 28],
      size: [4, 4],
    }],
    ['carrot', {
      form: 'square',
      num: [4, 5],
      color: [29, 28],
      size: [4, 4],
    }],
    ['cucumber', {
      form: 'square',
      num: [4, 5],
      color: [47, 46, 45],
      size: [4, 4],
    }],
  ])],

  ['cake_orange', new Map([
    ['chocolate_chips_dark', {
      form: 'square',
      num: [120, 130],
      color: [54, 53],
      size: [1, 2],
    }],
    ['chocolate_chips_milk', {
      form: 'square',
      num: [120, 130],
      color: [31, 30],
      size: [1, 2],
    }],
  ])],
  ['onigiri_kimchi', new Map([
    ['kimchi', {
      form: 'circle',
      num: [4, 15],
      color: [25, 27, 26],
      size: [2, 6],
    }],
    ['mozzarella', {
      form: 'square',
      num: [4, 10],
      color: [29, 28],
      size: [4, 4],
    }],
    ['cheddar', {
      form: 'square',
      num: [4, 10],
      color: [24, 25],
      size: [4, 4],
    }],
    ['gruyere', {
      form: 'square',
      num: [4, 10],
      color: [29, 28],
      size: [4, 4],
    }],
    ['sesame_seeds', {
      form: 'square',
      num: [30, 50],
      color: [29, 28, 27],
      size: [1, 2],
    }],
  ])],
  ['empanada_black_beans', new Map([
    ['black_beans', {
      form: 'circle',
      num: [2, 10],
      size: [2, 4],
      color: [54, 53, 52]
    }],
    ['red_bell_pepper', {
      form: 'square',
      color: [26, 25],
      num: [4, 6],
      size: [1, 2],
    }],
    ['green_bell_pepper', {
      form: 'square',
      color: [37, 36],
      num: [4, 6],
      size: [1, 2],
    }],
    ['orange_bell_pepper', {
      form: 'square',
      color: [29, 26],
      num: [4, 6],
      size: [1, 2],
    }],
    ['yellow_bell_pepper', {
      form: 'square',
      color: [29, 28],
      num: [4, 6],
      size: [1, 2],
    }],
    ['corn_kernels', {
      form: 'circle',
      num: [3, 10],
      size: [1, 2],
      color: [33, 34]
    }],
    ['ginger', {
      form: 'square',
      num: [2, 3],
      size: [1, 2],
      color: [28, 28]
    }],
    ['cilantro', {
      form: 'square',
      num: [2, 4],
      size: [2, 5],
      color: [42, 43, 45]
    }],
    ['carrot', {
      form: 'square',
      num: [2, 6],
      size: [1, 2],
      color: [24, 25]
    }],
    ['mozzarella', {
      form: 'circle',
      num: [1, 2],
      size: [2, 3],
      color: [23, 24]
    }],
    ['turnip', {
      form: 'square',
      num: [2, 3],
      size: [1, 2],
      color: [1, 1]
    }]
  ])],
  ['empanada_kimchi', new Map([
    ['kimchi', {
      form: 'circle',
      num: [4, 15],
      color: [25, 27, 26],
      size: [2, 6],
    }],
    ['mozzarella', {
      form: 'circle',
      num: [4, 10],
      color: [29, 28],
      size: [4, 4],
    }],
    ['cheddar', {
      form: 'circle',
      num: [4, 10],
      color: [24, 25],
      size: [4, 4],
    }],
    ['gruyere', {
      form: 'circle',
      num: [4, 10],
      color: [29, 28],
      size: [4, 4],
    }],
  ])],
  ['empanada_vegetables', new Map([
    ['carrot', {
      form: 'square',
      num: [2, 4],
      size: [2, 3],
      color: [21, 22]
    }],
    ['bell_pepper', {
      form: 'square',
      num: [1, 3],
      size: [2, 4],
      color: [30, 31]
    }],
    ['onion', {
      form: 'square',
      num: [2, 3],
      size: [2, 3],
      color: [32, 33]
    }],
    ['tomato', {
      form: 'circle',
      num: [1, 2],
      size: [2, 3],
      color: [34, 35]
    }],
    ['spinach', {
      form: 'square',
      num: [2, 4],
      size: [1, 2],
      color: [36, 37]
    }],
    ['corn_kernels', {
      form: 'circle',
      num: [3, 5],
      size: [1, 2],
      color: [15, 16]
    }],
    ['mozzarella', {
      form: 'circle',
      num: [1, 2],
      size: [2, 3],
      color: [23, 24]
    }]
  ])],
  ['ricotta_spinach', new Map([
    ['spinach', {
      form: 'square',
      num: [2, 10],
      size: [1, 5],
      color: [42, 43, 45]
    }],
    ['ricotta', {
      form: 'circle',
      num: [10, 20],
      size: [1, 3],
      color: [1, 1, 1]
    }]
  ])],

  ['savoy_cake_lemon', new Map([
    ['lemon', {
      form: 'circle',
      num: [4, 10],
      size: [2, 3],
      color: [33, 32]
    }]
  ])],
  ['savoy_cake_vanilla', new Map([
    ['vanilla', {
      form: 'circle',
      num: [4, 10],
      size: [2, 3],
      color: [31, 30]
    }]
  ])],
]);

