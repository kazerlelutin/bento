import { describe, it, expect, beforeEach, afterEach } from "bun:test";
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
    expect(content).toContain("script-src 'self'");
    expect(content).toContain("style-src 'self'");
  });
});
