import type { Ctrl } from "@features/routes/routes.type";

export type ExportCtrl = Ctrl & {
  getRecipe: () => Recipe;
  updateUI: () => void;
  handleExportClick: (e: Event) => void;
  unsubscribeIngredient?: () => void;
  updateFormatButtons: (activeFormat: 'md' | 'json') => void;
  downloadFile: (format: 'md' | 'json') => void;
  toMd: (recipe: Recipe) => string;
  toJson: (recipe: Recipe) => string;
}

export type Recipe = {
  name: string;
  ingredients: Ingredient[];
  steps: Step[];
}

export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export type Tool = {

}

export type Step = {
  tools: Tool[];
  name: string;
  description: string;
  tips?: string;
}

export type ExportType = 'md' | 'json';

export type ExportData = {
  type: ExportType;
  data: string;
}