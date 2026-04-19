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
  "install-app": {
    "fr": "Installer l’app",
    "en": "Install app",
    "ko": "앱 설치",
    "ch": "安装应用"
  },
  "install-app-dismiss": {
    "fr": "Plus tard",
    "en": "Not now",
    "ko": "나중에",
    "ch": "稍后"
  },
  "install-app-fallback-hint": {
    "fr": "Aucune invite automatique : utilisez le menu du navigateur (⋮ ou partage) → « Installer l’application » ou « Ajouter à l’écran d’accueil ». En local, préférez « bun run preview » après un build.",
    "en": "No automatic install prompt: use the browser menu (⋮ or Share) → Install app or Add to Home Screen. Locally, run « bun run preview » after building.",
    "ko": "자동 설치 안내가 없으면 브라우저 메뉴(⋮ 또는 공유)에서 앱 설치 또는 홈 화면에 추가를 선택하세요. 로컬에서는 빌드 후 « bun run preview »를 권장합니다.",
    "ch": "若未出现安装提示：请用浏览器菜单（⋮ 或分享）→「安装应用」或「添加到主屏幕」。本地开发请在构建后运行「 bun run preview 」。"
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
    "fr": "Prochaine recette",
    "en": "Next recipe",
    "ko": "다음 레시피",
    "ch": "下一道食谱"
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
  "recipes-catalog-title-short": {
    "fr": "Recettes",
    "en": "Recipes",
    "ko": "레시피",
    "ch": "食谱"
  },
  "recipes-filter-clear": {
    "fr": "Tout afficher",
    "en": "Show all",
    "ko": "전체 보기",
    "ch": "显示全部"
  },
  "recipes-filter-bar-aria": {
    "fr": "Filtre actif sur le repas emporté",
    "en": "Active packed-lunch filter",
    "ko": "도시락 필터 적용 중",
    "ch": "当前便当筛选"
  },
  "recipes-filter-add-aria": {
    "fr": "Ajouter un filtre (transport, couvert, etc.)",
    "en": "Add a filter (transport, cover, etc.)",
    "ko": "필터 추가 (운반, 뚜껑 등)",
    "ch": "添加筛选（便当盒等）"
  },
  "recipes-filter-field-label": {
    "fr": "Critère",
    "en": "Field",
    "ko": "항목",
    "ch": "条件"
  },
  "recipes-filter-value-label": {
    "fr": "Valeur",
    "en": "Value",
    "ko": "값",
    "ch": "值"
  },
  "recipes-filter-apply": {
    "fr": "Appliquer",
    "en": "Apply",
    "ko": "적용",
    "ch": "应用"
  },
  "recipes-filter-chip-remove-aria": {
    "fr": "Retirer ce filtre",
    "en": "Remove this filter",
    "ko": "이 필터 제거",
    "ch": "移除此筛选"
  },
  "recipes-meta-filtered-desc": {
    "fr": "{{field}} : {{value}} — recettes BENTO.",
    "en": "{{field}}: {{value}} — BENTO recipes.",
    "ko": "{{field}}: {{value}} — BENTO 레시피.",
    "ch": "{{field}}：{{value}} — BENTO 食谱。"
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
    "fr": "Repas emporté : transport, réchauffage, conservation au froid, ustensiles",
    "en": "Packed lunch: transport, reheating, cold storage, utensils",
    "ko": "도시락: 운반, 데우기, 냉장, 식기",
    "ch": "外带餐：携带、复热、冷藏、餐具"
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
  "bento-utensils": {
    "fr": "Ustensiles",
    "en": "Utensils",
    "ko": "식기",
    "ch": "餐具"
  },
  "bento-block-title": {
    "fr": "Repas emporté",
    "en": "Packed lunch",
    "ko": "도시락",
    "ch": "外带餐"
  },
  "bento-secondary-summary": {
    "fr": "Affiner et détails",
    "en": "More detail",
    "ko": "세부 정보",
    "ch": "更多细节"
  },
  "bento-cover": {
    "fr": "Couvert",
    "en": "Cutlery",
    "ko": "수저 필요",
    "ch": "餐具"
  },
  "bento-eating": {
    "fr": "À table",
    "en": "How to eat",
    "ko": "먹는 방법",
    "ch": "食用方式"
  },
  "bento-stains": {
    "fr": "Taches",
    "en": "Stains",
    "ko": "얼룩",
    "ch": "污渍"
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
  "bento-prep_time": {
    "fr": "Temps de préparation",
    "en": "Prep time",
    "ko": "준비 시간",
    "ch": "准备时间"
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
  "bentext-share-short": {
    "fr": "Partager",
    "en": "Share",
    "ko": "공유",
    "ch": "分享"
  },
  "bentext-print-short": {
    "fr": "Imprimer",
    "en": "Print",
    "ko": "인쇄",
    "ch": "打印"
  },
  "bentext-actions-aria": {
    "fr": "Partager ou imprimer la recette au format texte simplifié (bentext)",
    "en": "Share or print the recipe as simplified plain text (bentext)",
    "ko": "간단한 텍스트(bentext)로 레시피 공유 또는 인쇄",
    "ch": "以精简文本（bentext）分享或打印食谱"
  },
  "bentext-shared": {
    "fr": "Partage lancé.",
    "en": "Share sheet opened.",
    "ko": "공유 창이 열렸습니다.",
    "ch": "已打开分享。"
  },
  "bentext-share-copied-fallback": {
    "fr": "Partage indisponible : texte et lien copiés dans le presse-papiers.",
    "en": "Sharing unavailable: text and link copied to the clipboard.",
    "ko": "공유를 사용할 수 없어 텍스트와 링크를 클립보드에 복사했습니다.",
    "ch": "无法使用分享功能，已将文本和链接复制到剪贴板。"
  },
  "bentext-error": {
    "fr": "Impossible de récupérer le bentext. Réessayez plus tard.",
    "en": "Could not load bentext. Try again later.",
    "ko": "벤텍스트를 불러올 수 없습니다. 나중에 다시 시도하세요.",
    "ch": "无法加载 bentext，请稍后再试。"
  },
  "not-found-message": {
    "fr": "Encore une recette mystérieusement perdue.",
    "en": "Yet another recipe mysteriously lost.",
    "ko": "또 사라진 레시피, 이번에도 수수께끼입니다.",
    "ch": "又一道食谱神秘失踪了。"
  },
  "not-found-back-home": {
    "fr": "Retour à l’accueil",
    "en": "Back to home",
    "ko": "홈으로",
    "ch": "返回首页"
  },
} as const;

/** Traductions pour les balises meta (title, description, og:*, twitter:*). */
export const META: UiTranslation = {
  "meta-title": {
    fr: "BENTO - Cuisines coréenne, japonaise, chinoise & repas emportés",
    en: "BENTO - Korean, Japanese & Chinese recipes, bentos & packed lunches",
    ko: "BENTO - 한·일·중 요리, 벤토와 도시락",
    ch: "BENTO - 韩日中餐、便当与外带餐"
  },
  "meta-description": {
    fr: "Recettes inspirées surtout de Corée, du Japon et de Chine, pensées pour les bentos et repas à emporter : une fiche à la fois, tirage au hasard ou catalogue. Infos pratiques (transport, conservation…), export bentext pour copier ou imprimer.",
    en: "Recipes drawing mainly from Korea, Japan and China, geared toward bentos and packed lunches: one card at a time, random pick or searchable catalog. Practical tips (transport, storage…), bentext export to copy or print.",
    ko: "한국·일본·중국 요리에 기반한 도시락·외식 레시피: 한 장씩, 무작위 또는 검색 가능한 목록. 실용 안내(운반·보관 등), 벤텍스트 복사·인쇄.",
    ch: "以韩、日、中餐为主，面向便当与外带餐：每次一张卡片，随机或目录搜索。实用提示（携带、保存等）、bentext 复制或打印。"
  },
  "meta-keywords": {
    fr: "bento, cuisine coréenne, cuisine japonaise, cuisine chinoise, repas emporté, lunch box, bentext, street food asiatique, transport nourriture, catalogue recettes, tirage au hasard",
    en: "bento, Korean recipes, Japanese recipes, Chinese recipes, packed lunch, bentext, meal prep, recipe catalog, random recipe, East Asian street food",
    ko: "벤토, 한국 요리, 일본 요리, 중국 요리, 도시락, bentext, 길거리 음식, 레시피 목록, 무작위 추천",
    ch: "便当, 韩餐, 日餐, 中餐, 外带餐, bentext, 东亚街头小吃, 食谱目录, 随机推荐"
  },
  "meta-og-title": {
    fr: "BENTO - Cuisines coréenne, japonaise, chinoise & repas emportés",
    en: "BENTO - Korean, Japanese & Chinese recipes, bentos & packed lunches",
    ko: "BENTO - 한·일·중 요리, 벤토와 도시락",
    ch: "BENTO - 韩日中餐、便当与外带餐"
  },
  "meta-og-description": {
    fr: "Recettes inspirées surtout de Corée, du Japon et de Chine, pensées pour les bentos et repas à emporter : une fiche à la fois, tirage au hasard ou catalogue. Infos pratiques (transport, conservation…), export bentext pour copier ou imprimer.",
    en: "Recipes drawing mainly from Korea, Japan and China, geared toward bentos and packed lunches: one card at a time, random pick or searchable catalog. Practical tips (transport, storage…), bentext export to copy or print.",
    ko: "한국·일본·중국 요리에 기반한 도시락·외식 레시피: 한 장씩, 무작위 또는 검색 가능한 목록. 실용 안내(운반·보관 등), 벤텍스트 복사·인쇄.",
    ch: "以韩、日、中餐为主，面向便当与外带餐：每次一张卡片，随机或目录搜索。实用提示（携带、保存等）、bentext 复制或打印。"
  },
  "meta-og-image-alt": {
    fr: "BENTO — recettes d'Asie de l'Est, bentos et repas emportés",
    en: "BENTO — East Asian-inspired recipes, bentos and packed lunches",
    ko: "BENTO — 동아시아풍 레시피, 벤토와 도시락",
    ch: "BENTO — 东亚风味食谱、便当与外带餐"
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
  },
  "meta-not-found-title": {
    fr: "404 — BENTO",
    en: "404 — BENTO",
    ko: "404 — BENTO",
    ch: "404 — BENTO"
  },
  "meta-not-found-description": {
    fr: "Encore une recette mystérieusement perdue.",
    en: "Yet another recipe mysteriously lost.",
    ko: "또 사라진 레시피, 이번에도 수수께끼입니다.",
    ch: "又一道食谱神秘失踪了。"
  },
  "meta-not-found-keywords": {
    fr: "404, page introuvable, BENTO",
    en: "404, not found, BENTO",
    ko: "404, 페이지 없음, BENTO",
    ch: "404, 页面未找到, BENTO"
  },
  "meta-not-found-og-title": {
    fr: "404 — BENTO",
    en: "404 — BENTO",
    ko: "404 — BENTO",
    ch: "404 — BENTO"
  },
  "meta-not-found-og-description": {
    fr: "Encore une recette mystérieusement perdue.",
    en: "Yet another recipe mysteriously lost.",
    ko: "또 사라진 레시피, 이번에도 수수께끼입니다.",
    ch: "又一道食谱神秘失踪了。"
  }
};
