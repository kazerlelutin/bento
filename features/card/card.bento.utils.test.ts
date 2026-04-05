import { describe, it, expect, mock } from "bun:test";

const t = (x: unknown) => (x && typeof x === "object" && "fr" in x ? String((x as { fr: string }).fr) : String(x));
mock.module("@features/translate/translate", () => ({ t }));

const { hasBentoContent, renderCardBentoDl, BENTO_FIELD_KEYS } = await import("./card.bento.utils");

describe("card.bento.utils", () => {
  it("hasBentoContent is false for undefined or empty bento", () => {
    expect(hasBentoContent(undefined)).toBe(false);
    expect(hasBentoContent({})).toBe(false);
    expect(hasBentoContent({ transport: "  " })).toBe(false);
  });

  it("hasBentoContent is true when any field has text", () => {
    expect(hasBentoContent({ transport: "OK" })).toBe(true);
  });

  it("renderCardBentoDl skips empty fields and respects order", () => {
    const dl = document.createElement("dl");
    renderCardBentoDl(
      dl,
      {
        eating: "Main",
        transport: "Facile",
        cold: "",
      },
      "fr"
    );
    const dts = [...dl.querySelectorAll("dt")].map((el) => el.textContent);
    const dds = [...dl.querySelectorAll("dd")].map((el) => el.textContent);
    expect(dts.length).toBe(2);
    expect(dds).toEqual(["Facile", "Main"]);
    expect(BENTO_FIELD_KEYS.length).toBeGreaterThanOrEqual(4);
  });

  it("renderCardBentoDl wraps canonical transport value with internal link", () => {
    const dl = document.createElement("dl");
    renderCardBentoDl(dl, { transport: "Facile" }, "fr");
    const a = dl.querySelector("a.card-bento-dl__link");
    expect(a).not.toBeNull();
    expect(a?.getAttribute("href")).toContain("/fr/recipes?");
    expect(a?.getAttribute("data-internal")).toBe("true");
  });
});
