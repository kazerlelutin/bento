import type { Language } from "@features/translate/translate.types";
import { pathWithLang } from "@features/i18n/route-path";

/** Champs bento pour lesquels on a des ids canoniques (filtres + liens). */
export const BENTO_FILTER_FIELDS = [
  "transport",
  "reheat",
  "cold",
  "utensils",
  "cover",
  "stains",
  "smell",
  "prep_time",
] as const;

export type BentoFilterField = (typeof BENTO_FILTER_FIELDS)[number];

type LabelRow = { id: string } & Record<Language, string>;

function row(id: string, fr: string, en: string, ko: string, ch: string): LabelRow {
  return { id, fr, en, ko, ch };
}

/** Tableaux alignés sur bentext/docs/api-bento.md (ch = zh). */
const TRANSPORT: LabelRow[] = [
  row("transport_easy", "Facile", "Easy", "쉬움", "容易"),
  row("transport_medium", "Moyen", "Medium", "보통", "中等"),
  row("transport_delicate", "Délicat", "Delicate", "다소 까다로움", "易损"),
];

const REHEAT: LabelRow[] = [
  row("reheat_no", "Non", "No", "불필요", "不需要"),
  row("reheat_optional", "Optionnel", "Optional", "선택", "可选"),
  row(
    "reheat_optional_oven_micro",
    "Optionnel four ~ micro-ondes",
    "Optional oven ~ microwave",
    "선택 오븐 ~ 전자레인지",
    "可选 烤箱 ~ 微波炉"
  ),
  row(
    "reheat_optional_oven_pan",
    "Optionnel four ~ poêle",
    "Optional oven ~ pan",
    "선택 오븐 ~ 프라이팬",
    "可选 烤箱 ~ 平底锅"
  ),
  row(
    "reheat_recommended_steam_micro",
    "Recommandé vapeur ~ micro-ondes",
    "Recommended steam ~ microwave",
    "권장 찜 ~ 전자레인지",
    "建议 蒸 ~ 微波"
  ),
];

const COLD: LabelRow[] = [
  row("cold_no", "Non", "No", "아니오", "否"),
  row("cold_keep_short", "Au frais", "Keep cold", "냉장", "需冷藏"),
  row("cold_chilled_short", "Au frais", "Chilled", "냉장", "冷藏"),
  row("cold_delay", "Frais si délai", "Chilled if delay", "지연 ~ 냉장", "久置 ~ 冷藏"),
  row("cold_fresh_ambient", "Frais ~ ambiant", "Fresh ~ room temp", "냉장 ~ 실온", "冷藏 ~ 常温"),
];

const COVER: LabelRow[] = [
  row("cover_no", "Non", "No", "불필요", "不需要"),
  row("cover_optional", "Optionnel", "Optional", "선택", "可选"),
  row("cover_yes", "Oui", "Yes", "필요", "需要"),
];

const EATING: LabelRow[] = [
  row("eating_hand", "À la main", "By hand", "손으로", "手抓"),
  row("eating_cutlery", "Couverts", "Cutlery", "수저", "餐具"),
  row("eating_chopsticks", "Baguettes", "Chopsticks", "젓가락", "筷子"),
  row(
    "eating_chopsticks_cutlery",
    "Baguettes ~ Couverts",
    "Chopsticks ~ cutlery",
    "젓가락 ~ 수저",
    "筷子 ~ 餐具"
  ),
  row("eating_hand_chopsticks", "À la main ~ Baguettes", "Hand ~ chopsticks", "손 ~ 젓가락", "手抓 ~ 筷子"),
];

const STAINS: LabelRow[] = [
  row("stains_none", "Non", "None", "없음", "无"),
  row("stains_low", "Faible", "Low", "낮음", "低"),
  row("stains_medium", "Moyen", "Medium", "보통", "中"),
  row("stains_high", "Élevé", "High", "높음", "高"),
];

const SMELL: LabelRow[] = [
  row("smell_discrete", "Discrète", "Mild", "약함", "清淡"),
  row("smell_marked", "Marquée", "Strong", "강함", "明显"),
];

const PREP_TIME: LabelRow[] = [
  row("prep_quick", "Rapide", "Quick", "짧음", "快"),
  row("prep_medium", "Moyen", "Medium", "보통", "中"),
  row("prep_long", "Long", "Long", "긴 편", "长"),
];

const VOCAB_BY_FIELD: Record<BentoFilterField, LabelRow[]> = {
  transport: TRANSPORT,
  reheat: REHEAT,
  cold: COLD,
  /** Même jeu de valeurs que l’ancien champ `eating` (ids `eating_*`). */
  utensils: EATING,
  cover: COVER,
  stains: STAINS,
  smell: SMELL,
  prep_time: PREP_TIME,
};

/** Affichage : les alternatives API (`a ~ b`) deviennent « a, b ». */
export function formatBentoAlternativesForDisplay(s: string): string {
  return s.replace(/\s*~\s*/g, ", ");
}

/** Libellé affichable pour un id dans la langue UI. */
export function canonicalIdLabel(field: BentoFilterField, id: string, lang: Language): string | null {
  const rows = VOCAB_BY_FIELD[field];
  const r = rows.find((x) => x.id === id);
  return r ? formatBentoAlternativesForDisplay(r[lang]) : null;
}

/** Options pour un sélecteur de filtre (Notion-style). */
export function listBentoFilterValues(field: BentoFilterField, lang: Language): { id: string; label: string }[] {
  return VOCAB_BY_FIELD[field].map((row) => ({
    id: row.id,
    label: formatBentoAlternativesForDisplay(row[lang]),
  }));
}

function valueSegments(rawValue: string): string[] {
  const parts = rawValue
    .split(/\s*~\s*|\s*,\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : rawValue.trim() ? [rawValue.trim()] : [];
}

/** Valeur API → id canonique (d’abord chaîne entière, puis chaque segment `~`). */
export function bentoValueToCanonicalId(
  field: BentoFilterField,
  rawValue: string,
  lang: Language
): string | null {
  const rows = VOCAB_BY_FIELD[field];
  const full = rawValue.trim();
  if (full) {
    for (const row of rows) {
      if (row[lang] === full) return row.id;
    }
  }
  for (const seg of valueSegments(rawValue)) {
    for (const row of rows) {
      if (row[lang] === seg) return row.id;
    }
  }
  return null;
}

/** Tous les ids canoniques présents dans la valeur (chaîne entière + segments `~`). */
export function bentoValueToCanonicalIds(
  field: BentoFilterField,
  rawValue: string,
  lang: Language
): string[] {
  const rows = VOCAB_BY_FIELD[field];
  const out = new Set<string>();
  const full = rawValue.trim();
  if (full) {
    for (const row of rows) {
      if (row[lang] === full) out.add(row.id);
    }
  }
  for (const seg of valueSegments(rawValue)) {
    for (const row of rows) {
      if (row[lang] === seg) out.add(row.id);
    }
  }
  return [...out];
}

/** Indique si la recette correspond au filtre (même id canonique pour la valeur du champ). */
export function recipeBentoMatchesFilter(
  value: string | undefined,
  field: BentoFilterField,
  filterId: string,
  lang: Language
): boolean {
  if (!value?.trim()) return false;
  return bentoValueToCanonicalIds(field, value, lang).includes(filterId);
}

export type BentoFilterEntry = { field: BentoFilterField; id: string };

/** Lit tous les filtres bento présents dans la query (AND). */
export function parseBentoRecipesQuery(search: string | undefined): BentoFilterEntry[] {
  const q = search ?? "";
  const params = new URLSearchParams(q.startsWith("?") ? q.slice(1) : q);
  const out: BentoFilterEntry[] = [];
  for (const f of BENTO_FILTER_FIELDS) {
    let id = params.get(f)?.trim();
    if (f === "utensils" && !id) id = params.get("eating")?.trim() ?? undefined;
    if (id) out.push({ field: f, id });
  }
  return out;
}

export function buildRecipesFilteredHref(lang: Language, field: BentoFilterField, id: string): string {
  return `${pathWithLang(lang, "recipes")}?${encodeURIComponent(field)}=${encodeURIComponent(id)}`;
}

/** Sérialise plusieurs filtres dans l’URL (un paramètre par champ). */
export function buildRecipesFilteredHrefMany(lang: Language, filters: BentoFilterEntry[]): string {
  const base = pathWithLang(lang, "recipes");
  if (filters.length === 0) return base;
  const p = new URLSearchParams();
  for (const { field, id } of filters) {
    p.set(field, id);
  }
  return `${base}?${p.toString()}`;
}
