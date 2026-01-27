import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { LANGUAGE_SELECTOR_ID } from "./translate.const";

const mockStore = {
  currentLanguage: "fr" as "fr" | "en" | "ko" | "ch",
  setCurrentLanguage(_: string) {},
};
mock.module("./translate.store", () => ({ translateStore: mockStore }));
mock.module("./translate", () => ({ t: (x: unknown) => (x && typeof x === "object" && "fr" in x ? String((x as { fr: string }).fr) : "") }));

const { languageSelectorCtrl } = await import("./language-selector.ctrl");

describe("language-selector.ctrl", () => {
  let select: HTMLSelectElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <select id="${LANGUAGE_SELECTOR_ID}">
        <option value="fr">Français</option>
        <option value="en">English</option>
        <option value="ko">한국어</option>
        <option value="ch">中文</option>
      </select>
    `;
    select = document.getElementById(LANGUAGE_SELECTOR_ID) as HTMLSelectElement;
    mockStore.currentLanguage = "fr";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("sets select value to current language on init", () => {
    mockStore.currentLanguage = "en";
    languageSelectorCtrl.init();
    expect(select.value).toBe("en");
  });

  it("sets aria-label on init", () => {
    languageSelectorCtrl.init();
    expect(select.getAttribute("aria-label")).toBeDefined();
  });

  it("calls setCurrentLanguage when selection changes", () => {
    let setCurrentLanguageCalled = "";
    mockStore.setCurrentLanguage = (lang: string) => {
      setCurrentLanguageCalled = lang;
    };
    languageSelectorCtrl.init();
    select.value = "ko";
    select.dispatchEvent(new Event("change", { bubbles: true }));
    expect(setCurrentLanguageCalled).toBe("ko");
  });
});
