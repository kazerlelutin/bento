import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { resolvePublicBentextApiUrl } from "@features/recipes/recipes.const";
import { cspCtrl } from "./csp.ctrl";
import { CSP_META_SELECTOR } from "./csp.const";

describe("csp.ctrl", () => {
  beforeEach(() => {
    const meta = document.createElement("meta");
    meta.setAttribute("http-equiv", "Content-Security-Policy");
    document.head.appendChild(meta);
  });

  afterEach(() => {
    document.querySelector(CSP_META_SELECTOR)?.remove();
  });

  it("sets content on CSP meta element after init", () => {
    cspCtrl.init?.();
    const csp = document.querySelector(CSP_META_SELECTOR);
    expect(csp?.getAttribute("content")).toBeDefined();
    expect(csp?.getAttribute("content")).toContain("default-src 'self'");
  });

  it("includes script-src and style-src in policy", () => {
    cspCtrl.init?.();
    const content = document.querySelector(CSP_META_SELECTOR)?.getAttribute("content") ?? "";
    expect(content).toContain("script-src");
    expect(content).toContain("style-src 'self'");
    expect(content).toContain("worker-src");
  });

  it("includes API origin in img-src for recipe images", () => {
    cspCtrl.init?.();
    const content = document.querySelector(CSP_META_SELECTOR)?.getAttribute("content") ?? "";
    const origin = new URL(resolvePublicBentextApiUrl()).origin;
    expect(content).toContain(`img-src 'self' data: blob: ${origin}`);
  });
});
