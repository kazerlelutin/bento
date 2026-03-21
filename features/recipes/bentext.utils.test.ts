import { describe, it, expect } from "bun:test";
import { escapeHtmlForPre } from "./bentext.utils";

describe("bentext.utils", () => {
  describe("escapeHtmlForPre", () => {
    it("escapes HTML special characters", () => {
      expect(escapeHtmlForPre(`<>&"`)).toBe("&lt;&gt;&amp;&quot;");
    });

    it("leaves plain text unchanged", () => {
      expect(escapeHtmlForPre("blinis\n---\nflour")).toBe("blinis\n---\nflour");
    });
  });
});
