import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { LANGUAGE_SELECTOR_ID, LS_KEY } from "./translate.const";

let navigatedLang: string | null = null;
mock.module("./language-url", () => ({
  persistLanguageAndNavigate: (lang: "fr" | "en" | "ko" | "ch") => {
    navigatedLang = lang;
  },
}));

mock.module("@features/meta/meta.ctrl", () => ({ metaCtrl: { updateMeta: () => {} } }));
mock.module("@features/router/router", () => ({ router: { refreshCurrentRoute: () => {} } }));

const { translateStore } = await import("./translate.store");
const { languageSelectorCtrl } = await import("./language-selector.ctrl");

describe("language-selector.ctrl", () => {
  let select: HTMLSelectElement;

  beforeEach(() => {
    navigatedLang = null;
    translateStore.currentLanguage = "fr";
    localStorage.setItem(LS_KEY, "fr");
    document.body.innerHTML = `
      <select id="${LANGUAGE_SELECTOR_ID}">
        <option value="fr">Français</option>
        <option value="en">English</option>
        <option value="ko">한국어</option>
        <option value="ch">中文</option>
      </select>
    `;
    select = document.getElementById(LANGUAGE_SELECTOR_ID) as HTMLSelectElement;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("sets select value to current language on init", () => {
    translateStore.currentLanguage = "en";
    localStorage.setItem(LS_KEY, "en");
    languageSelectorCtrl.init();
    expect(select.value).toBe("en");
  });

  it("sets aria-label on init", () => {
    languageSelectorCtrl.init();
    expect(select.getAttribute("aria-label")).toBeDefined();
  });

  it("calls persistLanguageAndNavigate when selection changes", () => {
    languageSelectorCtrl.init();
    select.value = "ko";
    select.dispatchEvent(new Event("change", { bubbles: true }));
    expect(navigatedLang).toBe("ko");
  });
});
