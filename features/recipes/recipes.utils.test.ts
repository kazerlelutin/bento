import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { getApiBaseUrl, getApiLang } from "./recipes.utils";
import { DEFAULT_API_BASE } from "./recipes.const";
import { LS_KEY } from "@features/translate/translate.const";
import { translateStore } from "@features/translate/translate.store";
import type { Language } from "@features/translate/translate.types";

describe("recipes.utils", () => {
  const envKey = "PUBLIC_BENTEXT_API_URL";

  describe("getApiBaseUrl", () => {
    it("returns DEFAULT_API_BASE when env is undefined", () => {
      const prev = process.env[envKey];
      delete process.env[envKey];
      expect(getApiBaseUrl()).toBe(DEFAULT_API_BASE);
      if (prev !== undefined) process.env[envKey] = prev;
    });

    it("returns env value when PUBLIC_BENTEXT_API_URL is set", () => {
      const custom = "https://custom.api/v1";
      const prev = process.env[envKey];
      process.env[envKey] = custom;
      expect(getApiBaseUrl()).toBe(custom);
      if (prev !== undefined) process.env[envKey] = prev;
      else delete process.env[envKey];
    });
  });

  describe("getApiLang", () => {
    afterEach(() => {
      localStorage.removeItem(LS_KEY);
      translateStore.currentLanguage = "fr";
    });

    function syncLang(lang: Language) {
      localStorage.setItem(LS_KEY, lang);
      translateStore.currentLanguage = lang;
    }

    it("returns zh when language is ch", () => {
      syncLang("ch");
      expect(getApiLang()).toBe("zh");
    });

    it("returns fr when language is fr", () => {
      syncLang("fr");
      expect(getApiLang()).toBe("fr");
    });

    it("returns en when language is en", () => {
      syncLang("en");
      expect(getApiLang()).toBe("en");
    });

    it("returns ko when language is ko", () => {
      syncLang("ko");
      expect(getApiLang()).toBe("ko");
    });
  });
});
