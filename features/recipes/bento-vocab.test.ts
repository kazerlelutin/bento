import { describe, it, expect } from "bun:test";
import {
  bentoValueToCanonicalId,
  bentoValueToCanonicalIds,
  formatBentoAlternativesForDisplay,
  parseBentoRecipesQuery,
  recipeBentoMatchesFilter,
} from "./bento-vocab";

describe("bento-vocab", () => {
  it("bentoValueToCanonicalId matches full label", () => {
    expect(bentoValueToCanonicalId("transport", "Facile", "fr")).toBe("transport_easy");
  });

  it("bentoValueToCanonicalIds resolves segments separated by ~", () => {
    const ids = bentoValueToCanonicalIds(
      "reheat",
      "Optionnel four ~ micro-ondes",
      "fr"
    );
    expect(ids).toContain("reheat_optional_oven_micro");
  });

  it("parseBentoRecipesQuery returns all filter params (field order)", () => {
    expect(parseBentoRecipesQuery("?cover=cover_optional&transport=transport_easy")).toEqual([
      { field: "transport", id: "transport_easy" },
      { field: "cover", id: "cover_optional" },
    ]);
  });

  it("parseBentoRecipesQuery mappe eating (legacy) vers utensils", () => {
    expect(parseBentoRecipesQuery("?eating=eating_hand")).toEqual([{ field: "utensils", id: "eating_hand" }]);
    expect(parseBentoRecipesQuery("?utensils=eating_hand")).toEqual([{ field: "utensils", id: "eating_hand" }]);
  });

  it("formatBentoAlternativesForDisplay replaces tilde with comma", () => {
    expect(formatBentoAlternativesForDisplay("À la main ~ Baguettes")).toBe("À la main, Baguettes");
  });

  it("recipeBentoMatchesFilter uses segment-aware ids", () => {
    expect(
      recipeBentoMatchesFilter("Optionnel four ~ micro-ondes", "reheat", "reheat_optional_oven_micro", "fr")
    ).toBe(true);
    expect(recipeBentoMatchesFilter("Moyen", "transport", "transport_medium", "fr")).toBe(true);
  });
});
