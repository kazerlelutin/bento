import type { UiTranslation } from "./translate.types";

export const LS_KEY = 'bento_language';
export const availableLanguages = new Set(['fr', 'en', 'ko']);

export const UI: UiTranslation = {
  "add": {
    "fr": "Ajouter",
    "en": "Add",
    "ko": "추가"
  },
  "delete": {
    "fr": "Supprimer",
    "en": "Delete",
    "ko": "삭제"
  },
  "exchange": {
    "fr": "Échanger",
    "en": "Exchange",
    "ko": "교환"
  },
  "select": {
    "fr": "Sélectionner",
    "en": "Select",
    "ko": "선택"
  },
  "home": {
    "fr": "Home",
    "en": "Home",
    "ko": "홈"
  },
  "about": {
    "fr": "À propos",
    "en": "About",
    "ko": "정보"
  },
  "cancel": {
    "fr": "Annuler",
    "en": "Cancel",
    "ko": "취소"
  },
  "change_ingredient_warning": {
    "fr": "Changer cet ingrédient va modifier automatiquement tous les ingrédients de votre recette.",
    "en": "Changing this ingredient will automatically modify all ingredients in your recipe.",
    "ko": "이 재료를 변경하면 레시피의 모든 재료가 자동으로 수정됩니다."
  },
  "export": {
    "fr": "Export",
    "en": "Export",
    "ko": "내보내기"
  },
  "export-description": {
    "fr": "Exportez votre recette personnalisée dans différents formats",
    "en": "Export your customized recipe in different formats",
    "ko": "맞춤형 레시피를 다양한 형식으로 내보내기"
  },
  "export-md": {
    "fr": "Export Markdown",
    "en": "Markdown Export",
    "ko": "마크다운 내보내기"
  },
  "export-json": {
    "fr": "Export JSON",
    "en": "JSON Export",
    "ko": "JSON 내보내기"
  },
  "ingredients": {
    "fr": "Ingrédients",
    "en": "Ingredients",
    "ko": "재료"
  },
  "steps": {
    "fr": "Étapes",
    "en": "Steps",
    "ko": "단계"
  },
  "description": {
    "fr": "Description",
    "en": "Description",
    "ko": "설명"
  },
  "tips": {
    "fr": "Conseils",
    "en": "Tips",
    "ko": "팁"
  },
  "follow-updates": {
    "fr": "Suivre les mises à jour",
    "en": "Follow updates",
    "ko": "업데이트 팔로우"
  },

  "quantity-selector-value": {
    "fr": "Pour {quantity} personnes",
    "en": "For {quantity} people",
    "ko": "{quantity} 명"
  },
  "quantity-selector-value-plural": {
    "fr": "Pour {quantity} personnes",
    "en": "For {quantity} people",
    "ko": "{quantity} 명"
  },
  "ingredients-for": {
    "fr": "Ingrédients pour {quantity}",
    "en": "Ingredients for {quantity}",
    "ko": "{quantity}인분 재료"
  },
  "piece": {
    "fr": "pièce",
    "en": "piece",
    "ko": "개"
  },
  "piece-plural": {
    "fr": "pièces",
    "en": "pieces",
    "ko": "개"
  },
  "g": {
    "fr": "g",
    "en": "g",
    "ko": "g"
  },
  "g-plural": {
    "fr": "g",
    "en": "g",
    "ko": "g"
  },
  "ml": {
    "fr": "ml",
    "en": "ml",
    "ko": "ml"
  },
  "ml-plural": {
    "fr": "ml",
    "en": "ml",
    "ko": "ml"
  },
  "cl": {
    "fr": "cl",
    "en": "cl",
    "ko": "cl"
  },
  "cl-plural": {
    "fr": "cl",
    "en": "cl",
    "ko": "cl"
  },
  "l": {
    "fr": "l",
    "en": "l",
    "ko": "l"
  },
  "l-plural": {
    "fr": "l",
    "en": "l",
    "ko": "l"
  },
  "tsp": {
    "fr": "cuillère à café",
    "en": "teaspoon",
    "ko": "작은 숟가락"
  },
  "tsp-plural": {
    "fr": "cuillères à café",
    "en": "teaspoons",
    "ko": "작은 숟가락"
  },

  "tbsp": {
    "fr": "cuillère à soupe",
    "en": "tablespoon",
    "ko": "큰 숟가락"
  },
  "tbsp-plural": {
    "fr": "cuillères à soupe",
    "en": "tablespoons",
    "ko": "큰 숟가락"
  },
  "sheet": {
    "fr": "feuille",
    "en": "sheet",
    "ko": "장"
  },
  "sheet-plural": {
    "fr": "feuilles",
    "en": "sheets",
    "ko": "장"
  },
  "unit": {
    "fr": "unité",
    "en": "unit",
    "ko": "개"
  },
  "unit-plural": {
    "fr": "unités",
    "en": "units",
    "ko": "개"
  }
} as const;
