import { describe, it, expect } from "bun:test";
import { getTranslation } from "./translate.utils";
import type { Translation } from "./translate.types";

describe("translate", () => {
  describe("getTranslation (logique pure)", () => {
    it("should return French translation when language is French", () => {
      const translation: Translation = {
        fr: "Bonjour",
        en: "Hello",
        ko: "안녕하세요",
      };
      expect(getTranslation(translation, "fr")).toBe("Bonjour");
    });

    it("should return English translation when language is English", () => {
      const translation: Translation = {
        fr: "Bonjour",
        en: "Hello",
        ko: "안녕하세요",
      };
      expect(getTranslation(translation, "en")).toBe("Hello");
    });

    it("should return Korean translation when language is Korean", () => {
      const translation: Translation = {
        fr: "Bonjour",
        en: "Hello",
        ko: "안녕하세요",
      };
      expect(getTranslation(translation, "ko")).toBe("안녕하세요");
    });

    it("should return Chinese translation when language is Chinese", () => {
      const translation: Translation = {
        fr: "Accueil",
        en: "Home",
        ko: "홈",
        ch: "首页",
      };
      expect(getTranslation(translation, "ch")).toBe("首页");
    });

    it("should fallback to French when current language translation is missing", () => {
      const translation: Translation = {
        fr: "Bonjour",
        ko: "안녕하세요",
      };
      expect(getTranslation(translation, "en")).toBe("Bonjour");
    });

    it("should fallback to French when Korean translation is missing", () => {
      const translation: Translation = {
        fr: "Bonjour",
        en: "Hello",
      };
      expect(getTranslation(translation, "ko")).toBe("Bonjour");
    });

    it("should fallback to French when only fr is present", () => {
      const translation: Translation = {
        fr: "Bonjour",
      };
      expect(getTranslation(translation, "en")).toBe("Bonjour");
    });

    it("should return Not found for empty French translation", () => {
      const translation: Translation = { fr: "" };
      expect(getTranslation(translation, "fr")).toBe("Not found");
    });

    it('should return "Not found" when French translation is missing', () => {
      const translation = {
        en: "Hello",
        ko: "안녕하세요",
      } as Translation;
      expect(getTranslation(translation, "fr")).toBe("Not found");
    });

    it("should handle undefined translation gracefully", () => {
      expect(getTranslation(undefined as any, "fr")).toBe("Not found");
    });

    it("should handle null translation gracefully", () => {
      expect(getTranslation(null as any, "fr")).toBe("Not found");
    });

    it("should work with minimal translation object", () => {
      const translation: Translation = { fr: "Test" };
      expect(getTranslation(translation, "fr")).toBe("Test");
    });

    it("should handle all four languages", () => {
      const translation: Translation = {
        fr: "Français",
        en: "English",
        ko: "한국어",
        ch: "中文",
      };
      expect(getTranslation(translation, "fr")).toBe("Français");
      expect(getTranslation(translation, "en")).toBe("English");
      expect(getTranslation(translation, "ko")).toBe("한국어");
      expect(getTranslation(translation, "ch")).toBe("中文");
    });
  });
});
