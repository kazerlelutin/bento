import { Translation } from "@features/translate/translate.types";

export type Role = "core" | "optional" | "base";

export type Base = {
  id: string;
  name: Translation;
  ingredients: BaseIngredient[];
  steps: BaseStep[];

};

export type BaseIngredient = {
  id: string;
  quantity: number;
  unit: string;
  score?: number;
  substitutes?: string[];
  foe?: string[];
  role?: Role | string;
};

export type BaseStep = {
  id: string;
  order?: number;
  ingredients: string[];
};

export type BaseTool = {
  id: string;
  mandatory: boolean;
  priority?: number;
  substitutes?: string[];
};

export type Operation = {
  id: string;
  name: Translation;
  description: Translation;
  requiredTools: string[];
  optionalTools: string[];
  substitutes: Record<string, string[]>;
  tips: Translation;
};

export type Nutrition = {
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  fiber?: number;
  sugar?: number;
};

export type Ingredient = {
  id: string;
  name: Translation;
  category: string;
  origin: string;
  description: Translation;
  allergens?: string[];
  nutrition: Nutrition;
  nameComponent?: string;
};


export type Step = {
  id: string;
  name: Translation;
  description: Translation;
  tips?: Translation;
};

