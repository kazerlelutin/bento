import { describe, it, expect, mock } from "bun:test";

mock.module("@features/translate/translate", () => ({ t: (x: unknown) => (x && typeof x === "object" && "fr" in x ? String((x as { fr: string }).fr) : "") }));

const { formatQuantity } = await import("./card.utils");

describe("card.utils", () => {
  describe("formatQuantity", () => {
    it("returns integer string for whole numbers", () => {
      expect(formatQuantity(1)).toBe("1");
      expect(formatQuantity(2)).toBe("2");
      expect(formatQuantity(0)).toBe("0");
    });

    it("returns one decimal with comma for decimals", () => {
      expect(formatQuantity(1.5)).toBe("1,5");
      expect(formatQuantity(2.34)).toBe("2,3");
      expect(formatQuantity(0.12)).toBe("0,1");
    });

    it("rounds to one decimal place", () => {
      expect(formatQuantity(1.96)).toBe("2");
      expect(formatQuantity(1.94)).toBe("1,9");
    });
  });
});
