import { describe, it, expect, mock } from "bun:test";

const t = (x: unknown) => (x && typeof x === "object" && "fr" in x ? String((x as { fr: string }).fr) : String(x));
mock.module("@features/translate/translate", () => ({ t }));

const {
  hasBentoContent,
  renderCardBentoPrimary,
  renderCardBentoSecondary,
  renderCardBentoRecap,
  BENTO_FIELD_KEYS,
  BENTO_PRIMARY_KEYS,
} = await import("./card.bento.utils");

describe("card.bento.utils", () => {
  it("hasBentoContent is false for undefined or empty bento", () => {
    expect(hasBentoContent(undefined)).toBe(false);
    expect(hasBentoContent({})).toBe(false);
    expect(hasBentoContent({ transport: "  " })).toBe(false);
  });

  it("hasBentoContent is true when any field has text", () => {
    expect(hasBentoContent({ transport: "OK" })).toBe(true);
  });

  it("getBentoFieldValue utensils replie sur eating", async () => {
    const { getBentoFieldValue } = await import("./card.bento.utils");
    expect(getBentoFieldValue({ eating: "Main" }, "utensils")).toBe("Main");
    expect(getBentoFieldValue({ utensils: "Fourchette" }, "utensils")).toBe("Fourchette");
  });

  it("renderCardBentoPrimary crée un pilier par champ primaire rempli", () => {
    const grid = document.createElement("div");
    renderCardBentoPrimary(
      grid,
      {
        transport: "Facile",
        utensils: "Couverts",
        cold: "",
      },
      "fr"
    );
    expect(grid.querySelectorAll(".card-bento-pillar").length).toBe(2);
    expect(grid.textContent).toContain("Facile");
    expect(grid.textContent).toContain("Couverts");
    expect(BENTO_PRIMARY_KEYS.length).toBe(4);
  });

  it("renderCardBentoSecondary respecte l’ordre et les lignes vides", () => {
    const dl = document.createElement("dl");
    renderCardBentoSecondary(
      dl,
      {
        cover: "Oui",
        stains: "Faible",
      },
      "fr"
    );
    const dts = [...dl.querySelectorAll("dt")].map((el) => el.textContent);
    expect(dts.length).toBe(2);
    expect(dl.textContent).toContain("Faible");
  });

  it("lien interne sur transport dans le pilier", () => {
    const grid = document.createElement("div");
    renderCardBentoPrimary(grid, { transport: "Facile" }, "fr");
    const a = grid.querySelector("a.card-bento-dl__link");
    expect(a).not.toBeNull();
    expect(a?.getAttribute("href")).toContain("/fr/recipes?");
    expect(a?.getAttribute("data-internal")).toBe("true");
  });

  it("renderCardBentoRecap masque le héros si seulement secondaire", () => {
    const heading = document.createElement("h2");
    const primary = document.createElement("div");
    const details = document.createElement("details");
    const dl = document.createElement("dl");
    details.appendChild(dl);
    renderCardBentoRecap(
      { primaryHeading: heading, primaryGrid: primary, secondaryWrap: details, secondaryDl: dl },
      { stains: "Faible" },
      "fr"
    );
    expect(heading.hidden).toBe(true);
    expect(primary.hidden).toBe(true);
    expect(details.hidden).toBe(false);
    expect(details.open).toBe(true);
  });

  it("BENTO_FIELD_KEYS inclut primaire + secondaire", () => {
    expect(BENTO_FIELD_KEYS.length).toBe(BENTO_PRIMARY_KEYS.length + 6);
  });
});
