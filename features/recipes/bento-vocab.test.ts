import { describe, it, expect } from "bun:test";
import {
  bentoValueToCanonicalId,
  bentoValueToCanonicalIds,
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

  it("parseBentoRecipesQuery returns first known filter param", () => {
    expect(parseBentoRecipesQuery("?cover=cover_optional&transport=transport_easy")).toEqual({
      field: "transport",
      id: "transport_easy",
    });
  });

  it("recipeBentoMatchesFilter uses segment-aware ids", () => {
    expect(
      recipeBentoMatchesFilter("Optionnel four ~ micro-ondes", "reheat", "reheat_optional_oven_micro", "fr")
    ).toBe(true);
    expect(recipeBentoMatchesFilter("Moyen", "transport", "transport_medium", "fr")).toBe(true);
  });
});
