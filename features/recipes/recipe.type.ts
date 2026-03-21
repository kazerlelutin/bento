type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  alternative?: Ingredient[];
  /** Coordonnées dans la feuille de sprites (en pixels), URL sprite = API_BASE/ingredients/sprite. */
  icon?: { x: number; y: number };
};

/** Bloc « repas emporté » renvoyé par l’API bentext (clés JSON). */
export type RecipeBento = {
  transport?: string;
  reheat?: string;
  cold?: string;
  eating?: string;
  leaks?: string;
  smell?: string;
  prep_ahead?: string;
  holding?: string;
  extra_notes?: string;
};

export type Recipe = {
  slug: string;
  identity: {
    name: string;
    description: string;
    servings: number;
  };
  ingredients: Ingredient[];
  steps: string[];
  notes: string[];
  tags: string[];
  bento?: RecipeBento;
  image?: {
    url: string;
    width: number;
    height: number;
  };
};



export type RecipesStore = {
  recipes: Recipe[];
  loadError: string | null;
  setRecipes(recipes: Recipe[]): void;
  setLoadError(error: string | null): void;
};