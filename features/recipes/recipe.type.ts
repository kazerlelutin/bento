type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  alternative?: Ingredient[];
  /** Coordonnées dans la feuille de sprites (en pixels), URL sprite = API_BASE/ingredients/sprite. */
  icon?: { x: number; y: number };
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