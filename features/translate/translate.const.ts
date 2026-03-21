import type { UiTranslation } from "@features/translate/translate.types";

export const LS_KEY = 'bento_language';
export const availableLanguages = new Set(['fr', 'en', 'ko', 'ch']);
export const LANGUAGE_SELECTOR_ID = "language-selector";

export const UI: UiTranslation = {
  "home": {
    "fr": "Accueil",
    "en": "Home",
    "ko": "홈",
    "ch": "首页"
  },
  "add": {
    "fr": "Ajouter",
    "en": "Add",
    "ko": "추가",
    "ch": "添加"
  },
  "support-me": {
    "fr": "Offrir un café",
    "en": "Buy me a coffee",
    "ko": "커피 사주기",
    "ch": "请我喝杯咖啡"
  },
  "language-selector-label": {
    "fr": "Choisir la langue",
    "en": "Choose language",
    "ko": "언어 선택",
    "ch": "选择语言"
  },
  "delete": {
    "fr": "Supprimer",
    "en": "Delete",
    "ko": "삭제",
    "ch": "删除"
  },
  "exchange": {
    "fr": "Échanger",
    "en": "Exchange",
    "ko": "교환",
    "ch": "交换"
  },
  "select": {
    "fr": "Sélectionner",
    "en": "Select",
    "ko": "선택",
    "ch": "选择"
  },
  "about": {
    "fr": "À propos",
    "en": "About",
    "ko": "정보",
    "ch": "关于"
  },
  "cancel": {
    "fr": "Annuler",
    "en": "Cancel",
    "ko": "취소",
    "ch": "取消"
  },
  "change_ingredient_warning": {
    "fr": "Changer cet ingrédient va modifier automatiquement tous les ingrédients de votre recette.",
    "en": "Changing this ingredient will automatically modify all ingredients in your recipe.",
    "ko": "이 재료를 변경하면 레시피의 모든 재료가 자동으로 수정됩니다.",
    "ch": "更换此食材将自动修改食谱中的所有食材。"
  },
  "export": {
    "fr": "Export",
    "en": "Export",
    "ko": "내보내기",
    "ch": "导出"
  },
  "export-description": {
    "fr": "Exportez votre recette personnalisée dans différents formats",
    "en": "Export your customized recipe in different formats",
    "ko": "맞춤형 레시피를 다양한 형식으로 내보내기",
    "ch": "将您的自定义食谱导出为不同格式"
  },
  "export-md": {
    "fr": "Export Markdown",
    "en": "Markdown Export",
    "ko": "마크다운 내보내기",
    "ch": "导出 Markdown"
  },
  "export-json": {
    "fr": "Export JSON",
    "en": "JSON Export",
    "ko": "JSON 내보내기",
    "ch": "导出 JSON"
  },
  "ingredients": {
    "fr": "Ingrédients",
    "en": "Ingredients",
    "ko": "재료",
    "ch": "食材"
  },
  "steps": {
    "fr": "Étapes",
    "en": "Steps",
    "ko": "단계",
    "ch": "步骤"
  },
  "description": {
    "fr": "Description",
    "en": "Description",
    "ko": "설명",
    "ch": "描述"
  },
  "tips": {
    "fr": "Conseils",
    "en": "Tips",
    "ko": "팁",
    "ch": "小贴士"
  },
  "follow-updates": {
    "fr": "Quoi de neuf ?",
    "en": "What's new?",
    "ko": "새로운 기능",
    "ch": "有什么新功能？"
  },

  "quantity-selector-value": {
    "fr": "Pour {quantity} personnes",
    "en": "For {quantity} people",
    "ko": "{quantity} 명",
    "ch": "{quantity} 人份"
  },
  "quantity-selector-value-plural": {
    "fr": "Pour {quantity} personnes",
    "en": "For {quantity} people",
    "ko": "{quantity} 명",
    "ch": "{quantity} 人份"
  },
  "ingredients-for": {
    "fr": "Ingrédients pour {quantity}",
    "en": "Ingredients for {quantity}",
    "ko": "{quantity}인분 재료",
    "ch": "{quantity} 人份食材"
  },
  "serving_portions": {
    "fr": "{quantity} portions",
    "en": "{quantity} servings",
    "ko": "{quantity} 인분",
    "ch": "{quantity} 份"
  },
  "serving_decrease": {
    "fr": "Réduire le nombre de portions",
    "en": "Decrease number of servings",
    "ko": "인분 줄이기",
    "ch": "减少份数"
  },
  "serving_increase": {
    "fr": "Augmenter le nombre de portions",
    "en": "Increase number of servings",
    "ko": "인분 늘리기",
    "ch": "增加份数"
  },
  "piece": {
    "fr": "pièce",
    "en": "piece",
    "ko": "개",
    "ch": "个"
  },
  "piece-plural": {
    "fr": "pièces",
    "en": "pieces",
    "ko": "개",
    "ch": "个"
  },
  "g": {
    "fr": "g",
    "en": "g",
    "ko": "g",
    "ch": "克"
  },
  "g-plural": {
    "fr": "g",
    "en": "g",
    "ko": "g",
    "ch": "克"
  },
  "ml": {
    "fr": "ml",
    "en": "ml",
    "ko": "ml",
    "ch": "毫升"
  },
  "ml-plural": {
    "fr": "ml",
    "en": "ml",
    "ko": "ml",
    "ch": "毫升"
  },
  "cl": {
    "fr": "cl",
    "en": "cl",
    "ko": "cl",
    "ch": "厘升"
  },
  "cl-plural": {
    "fr": "cl",
    "en": "cl",
    "ko": "cl",
    "ch": "厘升"
  },
  "l": {
    "fr": "l",
    "en": "l",
    "ko": "l",
    "ch": "升"
  },
  "l-plural": {
    "fr": "l",
    "en": "l",
    "ko": "l",
    "ch": "升"
  },
  "tsp": {
    "fr": "cuillère à café",
    "en": "teaspoon",
    "ko": "작은 숟가락",
    "ch": "茶匙"
  },
  "tsp-plural": {
    "fr": "cuillères à café",
    "en": "teaspoons",
    "ko": "작은 숟가락",
    "ch": "茶匙"
  },

  "tbsp": {
    "fr": "cuillère à soupe",
    "en": "tablespoon",
    "ko": "큰 숟가락",
    "ch": "汤匙"
  },
  "tbsp-plural": {
    "fr": "cuillères à soupe",
    "en": "tablespoons",
    "ko": "큰 숟가락",
    "ch": "汤匙"
  },
  "sheet": {
    "fr": "feuille",
    "en": "sheet",
    "ko": "장",
    "ch": "张"
  },
  "sheet-plural": {
    "fr": "feuilles",
    "en": "sheets",
    "ko": "장",
    "ch": "张"
  },
  "unit": {
    "fr": "unité",
    "en": "unit",
    "ko": "개",
    "ch": "单位"
  },
  "unit-plural": {
    "fr": "unités",
    "en": "units",
    "ko": "개",
    "ch": "单位"
  },
  'notes': {
    'fr': 'Notes',
    'en': 'Notes',
    'ko': '메모',
    'ch': '备注'
  },
  "randomRecipe": {
    "fr": "Autre recette au hasard",
    "en": "Random recipe",
    "ko": "무작위 레시피",
    "ch": "随机食谱"
  },
  "openRecipeCatalog": {
    "fr": "Liste des recettes et recherche",
    "en": "Recipe list and search",
    "ko": "레시피 목록 및 검색",
    "ch": "食谱列表与搜索"
  },
  "all-recipes": {
    "fr": "Toutes les recettes",
    "en": "All recipes",
    "ko": "모든 레시피",
    "ch": "所有食谱"
  },
  "all-recipes-search-placeholder": {
    "fr": "Rechercher une recette",
    "en": "Search recipes",
    "ko": "레시피 검색",
    "ch": "搜索食谱"
  },
  "all-recipes-empty": {
    "fr": "Aucune recette disponible",
    "en": "No recipes available",
    "ko": "사용 가능한 레시피가 없습니다",
    "ch": "暂无食谱"
  },
  "all-recipes-no-results": {
    "fr": "Aucun résultat",
    "en": "No results",
    "ko": "결과 없음",
    "ch": "无结果"
  },
  "recipes-loading": {
    "fr": "Chargement…",
    "en": "Loading…",
    "ko": "불러오는 중…",
    "ch": "加载中…"
  },
  "recipes-load-error": {
    "fr": "Impossible de charger les recettes. Vérifiez votre connexion.",
    "en": "Unable to load recipes. Please check your connection.",
    "ko": "레시피를 불러올 수 없습니다. 연결을 확인해 주세요.",
    "ch": "无法加载食谱，请检查网络连接。"
  },
  "retry": {
    "fr": "Réessayer",
    "en": "Retry",
    "ko": "다시 시도",
    "ch": "重试"
  },
  "bento-recap-aria": {
    "fr": "Repas emporté : transport, conservation, consommation",
    "en": "Packed lunch: transport, storage, how to eat",
    "ko": "도시락: 운반, 보관, 섭취",
    "ch": "外带餐：携带、保存、食用"
  },
  "bento-transport": {
    "fr": "Transport",
    "en": "Transport",
    "ko": "운반",
    "ch": "携带"
  },
  "bento-reheat": {
    "fr": "Réchauffage",
    "en": "Reheating",
    "ko": "데우기",
    "ch": "复热"
  },
  "bento-cold": {
    "fr": "Conservation au froid",
    "en": "Cold storage",
    "ko": "냉장 보관",
    "ch": "冷藏"
  },
  "bento-eating": {
    "fr": "À table",
    "en": "How to eat",
    "ko": "먹는 방법",
    "ch": "食用方式"
  },
  "bento-leaks": {
    "fr": "Fuites / étanchéité",
    "en": "Leaks",
    "ko": "샘 방지",
    "ch": "渗漏"
  },
  "bento-smell": {
    "fr": "Odeur",
    "en": "Smell",
    "ko": "냄새",
    "ch": "气味"
  },
  "bento-prep_ahead": {
    "fr": "Préparation la veille",
    "en": "Prep ahead",
    "ko": "전날 준비",
    "ch": "提前准备"
  },
  "bento-holding": {
    "fr": "Tenue / conservation",
    "en": "Holding",
    "ko": "보관 시간",
    "ch": "存放"
  },
  "bento-extra_notes": {
    "fr": "Notes",
    "en": "Notes",
    "ko": "메모",
    "ch": "备注"
  },
  "bentext-copy-short": {
    "fr": "Copier",
    "en": "Copy",
    "ko": "복사",
    "ch": "复制"
  },
  "bentext-print-short": {
    "fr": "Imprimer",
    "en": "Print",
    "ko": "인쇄",
    "ch": "打印"
  },
  "bentext-actions-aria": {
    "fr": "Copier ou imprimer la recette au format texte simplifié (bentext)",
    "en": "Copy or print the recipe as simplified plain text (bentext)",
    "ko": "간단한 텍스트(bentext)로 레시피 복사 또는 인쇄",
    "ch": "以精简文本（bentext）复制或打印食谱"
  },
  "bentext-copied": {
    "fr": "Texte copié dans le presse-papiers.",
    "en": "Text copied to clipboard.",
    "ko": "클립보드에 복사했습니다.",
    "ch": "已复制到剪贴板。"
  },
  "bentext-error": {
    "fr": "Impossible de récupérer le bentext. Réessayez plus tard.",
    "en": "Could not load bentext. Try again later.",
    "ko": "벤텍스트를 불러올 수 없습니다. 나중에 다시 시도하세요.",
    "ch": "无法加载 bentext，请稍后再试。"
  },
} as const;

/** Traductions pour les balises meta (title, description, og:*, twitter:*). */
export const META: UiTranslation = {
  "meta-title": {
    fr: "BENTO - Des recettes quand tu n'as pas d'idée",
    en: "BENTO - Recipe ideas when you're out of inspiration",
    ko: "BENTO - 레시피 아이디어가 필요할 때",
    ch: "BENTO - 没有灵感时的食谱推荐"
  },
  "meta-description": {
    fr: "Plus d'idée de recette ? BENTO t'en propose une à la fois, avec un catalogue pour tout parcourir ou rechercher. Recettes végé et bentos en pixel art.",
    en: "Out of recipe ideas? BENTO suggests one recipe at a time, with a catalog to browse or search. Vegetarian recipes and pixel art bentos.",
    ko: "레시피 아이디어가 없으신가요? BENTO는 한 번에 하나씩 추천하고, 전체 목록을 검색·탐색할 수 있습니다. 채식 레시피와 픽셀 아트 벤토.",
    ch: "没有食谱灵感？BENTO 每次推荐一道菜，另有完整目录可搜索浏览——像素风呈现。"
  },
  "meta-keywords": {
    fr: "bento, recettes végétariennes, végé, pas d'idée, inspiration cuisine, pixel art, lunch box, cuisine japonaise, découvrir recettes",
    en: "bento, vegetarian recipes, veggie, no idea what to cook, cooking inspiration, pixel art, lunch box, japanese cuisine, discover recipes",
    ko: "벤토, 채식 레시피, 요리 아이디어, 픽셀 아트, 도시락, 일본 요리, 레시피 추천",
    ch: "便当, 素食食谱, 烹饪灵感, 像素艺术, 便当盒, 日式料理, 食谱推荐"
  },
  "meta-og-title": {
    fr: "BENTO - Des recettes quand tu n'as pas d'idée",
    en: "BENTO - Recipe ideas when you're out of inspiration",
    ko: "BENTO - 레시피 아이디어가 필요할 때",
    ch: "BENTO - 没有灵感时的食谱推荐"
  },
  "meta-og-description": {
    fr: "Plus d'idée de recette ? BENTO t'en propose une à la fois, avec un catalogue pour tout parcourir ou rechercher. Recettes végé et bentos en pixel art.",
    en: "Out of recipe ideas? BENTO suggests one recipe at a time, with a catalog to browse or search. Vegetarian recipes and pixel art bentos.",
    ko: "레시피 아이디어가 없으신가요? BENTO는 한 번에 하나씩 추천하고, 전체 목록을 검색·탐색할 수 있습니다. 채식 레시피와 픽셀 아트 벤토.",
    ch: "没有食谱灵感？BENTO 每次推荐一道菜，另有完整目录可搜索浏览——像素风呈现。"
  },
  "meta-og-image-alt": {
    fr: "BENTO - Des recettes quand tu n'as pas d'idée",
    en: "BENTO - Recipe ideas when you're out of inspiration",
    ko: "BENTO - 레시피 아이디어가 필요할 때",
    ch: "BENTO - 没有灵感时的食谱推荐"
  },
  "meta-content-language": {
    fr: "fr",
    en: "en",
    ko: "ko",
    ch: "zh"
  },
  "meta-og-locale": {
    fr: "fr_FR",
    en: "en_US",
    ko: "ko_KR",
    ch: "zh_CN"
  }
};
