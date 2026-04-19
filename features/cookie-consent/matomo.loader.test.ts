import { describe, it, expect, beforeEach } from "bun:test";
import { loadMatomo } from "./matomo.loader";

describe("matomo.loader", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.head.innerHTML = "";
    delete (window as unknown as { _paq?: unknown })._paq;
    const anchor = document.createElement("script");
    document.body.appendChild(anchor);
  });

  it("n’insère qu’un seul script matomo.js même si loadMatomo est rappelé", () => {
    loadMatomo();
    loadMatomo();
    const scripts = [...document.getElementsByTagName("script")].filter((s) =>
      (s.src || "").includes("matomo.js")
    );
    expect(scripts.length).toBe(1);
  });
});
