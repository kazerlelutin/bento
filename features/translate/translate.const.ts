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
  "removeFromFavorites": {
    "fr": "Retirer des sauvegardes",
    "en": "Remove from favorites",
    "ko": "Remove from favorites",
    "ch": "从收藏中移除"
  },
  "saveForLater": {
    "fr": "Sauvegarder pour plus tard",
    "en": "Save for later",
    "ko": "Save for later",
    "ch": "稍后保存"
  },
  "reject": {
    "fr": "Rejeter",
    "en": "Reject",
    "ko": "Reject",
    "ch": "跳过"
  },
  "like": {
    "fr": "J'aime",
    "en": "Like",
    "ko": "Like",
    "ch": "喜欢"
  },
  "my-favorites": {
    "fr": "Mes sauvegardes",
    "en": "My favorites",
    "ko": "My favorites",
    "ch": "我的收藏"
  },
  "click_the_ingredient_instruction": {
    "fr": "Clique sur le {name} !",
    "en": "Click on the {name}!",
    "ko": "{name} 클릭!",
    "ch": "点击 {name}！"
  },
  "click_the_ingredient_rules": {
    "fr": "Clique sur l'ingrédient demandé avant la fin du temps.",
    "en": "Click on the requested ingredient before time runs out.",
    "ko": "제한 시간 안에 요청한 재료를 클릭하세요.",
    "ch": "在时间结束前点击要求的食材。"
  },
  "click_the_ingredient_title": {
    "fr": "Clique sur l'ingrédient",
    "en": "Click the ingredient",
    "ko": "재료 클릭",
    "ch": "点击食材"
  },
  "find_the_intruder_instruction": {
    "fr": "Trouve l'intrus !",
    "en": "Find the intruder!",
    "ko": "침입자 찾기!",
    "ch": "找出不同！"
  },
  "find_the_intruder_rules": {
    "fr": "Trouve l'intrus parmi les quatre ingrédients avant la fin du temps.",
    "en": "Find the intruder among the four ingredients before time runs out.",
    "ko": "제한 시간 안에 네 가지 재료 중 어울리지 않는 것을 찾으세요.",
    "ch": "在时间结束前从四种食材中找出不同的那个。"
  },
  "find_the_intruder_title": {
    "fr": "Ce qui ne va pas",
    "en": "What doesn't belong",
    "ko": "어울리지 않는 것",
    "ch": "找出不同"
  },
  "micro_game_start": {
    "fr": "Commencer",
    "en": "Start",
    "ko": "시작",
    "ch": "开始"
  },
  "micro_game_close": {
    "fr": "Fermer",
    "en": "Close",
    "ko": "닫기",
    "ch": "关闭"
  },
  "micro_game_result_win": {
    "fr": "Victoire !",
    "en": "You win!",
    "ko": "승리!",
    "ch": "胜利！"
  },
  "micro_game_result_lose": {
    "fr": "Défaite",
    "en": "You lose",
    "ko": "패배",
    "ch": "失败"
  },
  "micro_game_session_score": {
    "fr": "Score : {score}",
    "en": "Score: {score}",
    "ko": "점수: {score}",
    "ch": "得分：{score}"
  },
  "micro_game_time_remaining": {
    "fr": "Temps restant",
    "en": "Time remaining",
    "ko": "남은 시간",
    "ch": "剩余时间"
  },
  "favorites-empty": {
    "fr": "Aucune recette sauvegardée",
    "en": "No saved recipes",
    "ko": "저장된 레시피가 없습니다",
    "ch": "暂无收藏的食谱"
  },
  "favorites-search-placeholder": {
    "fr": "Rechercher une recette",
    "en": "Search recipes",
    "ko": "레시피 검색",
    "ch": "搜索食谱"
  },
  "favorites-no-results": {
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
    fr: "Plus d'idée de recette ? BENTO t'en propose une à la fois jusqu'à trouver ton match. Toutes les recettes sont végé. Passe, like ou sauvegarde — des bentos en pixel art pour retrouver l'envie de cuisiner.",
    en: "Out of recipe ideas? BENTO suggests one at a time until you find your match. All recipes are vegetarian. Swipe, like or save — pixel art bentos to get you back in the mood for cooking.",
    ko: "레시피 아이디어가 없으신가요? BENTO가 하나씩 추천해요. 맞는 레시피를 찾을 때까지. 모든 레시피는 채식이에요. 픽셀 아트 벤토로 요리하고 싶은 마음이 생겨요.",
    ch: "没有食谱灵感？BENTO 为你逐个推荐直到找到心仪之选。全部素食。滑动、喜欢或收藏——像素风便当让你重拾下厨乐趣。"
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
    fr: "Plus d'idée de recette ? BENTO t'en propose une à la fois jusqu'à trouver ton match. Toutes les recettes sont végé. Passe, like ou sauvegarde — des bentos en pixel art pour retrouver l'envie de cuisiner.",
    en: "Out of recipe ideas? BENTO suggests one at a time until you find your match. All recipes are vegetarian. Swipe, like or save — pixel art bentos to get you back in the mood for cooking.",
    ko: "레시피 아이디어가 없으신가요? BENTO가 하나씩 추천해요. 맞는 레시피를 찾을 때까지. 모든 레시피는 채식이에요. 픽셀 아트 벤토로 요리하고 싶은 마음이 생겨요.",
    ch: "没有食谱灵感？BENTO 为你逐个推荐直到找到心仪之选。全部素食。滑动、喜欢或收藏——像素风便当让你重拾下厨乐趣。"
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
