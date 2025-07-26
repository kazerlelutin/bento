export const LS_KEY = 'bento_language';
export const availableLanguages = new Set(['fr', 'en', 'ko']);

export const UI = {
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
  "follow-updates": {
    "fr": "Suivre les mises à jour",
    "en": "Follow updates",
    "ko": "업데이트 팔로우"
  }
} as const;
