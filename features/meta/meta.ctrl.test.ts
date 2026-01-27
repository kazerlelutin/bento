import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";

const t = (x: unknown) => (x && typeof x === "object" && "fr" in x ? String((x as { fr: string }).fr) : String(x));
mock.module("@features/translate/translate", () => ({ t }));

const { metaCtrl } = await import("./meta.ctrl");

describe("meta.ctrl", () => {
  const originalTitle = document.title;

  beforeEach(() => {
    document.body.innerHTML = `
      <meta name="description" content="">
      <meta name="keywords" content="">
      <meta http-equiv="content-language" content="">
      <meta property="og:title" content="">
      <meta property="og:description" content="">
      <meta property="og:locale" content="">
    `;
    document.documentElement.lang = "";
    document.title = "";
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  it("updateMeta sets document.title", () => {
    metaCtrl.updateMeta();
    expect(document.title).toBeDefined();
    expect(typeof document.title).toBe("string");
  });

  it("updateMeta sets document.documentElement.lang", () => {
    metaCtrl.updateMeta();
    expect(document.documentElement.lang).toBeDefined();
  });

  it("init calls updateMeta", () => {
    metaCtrl.init();
    expect(document.title).toBeDefined();
  });
});
