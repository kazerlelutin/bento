import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { setMetaContent } from "./meta.utils";

describe("meta.utils", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("sets attribute on existing element", () => {
    const meta = document.createElement("meta");
    meta.name = "test";
    document.head.appendChild(meta);
    setMetaContent('meta[name="test"]', "content", "hello");
    expect(meta.getAttribute("content")).toBe("hello");
  });

  it("does not throw when selector matches no element", () => {
    expect(() => setMetaContent('meta[name="nonexistent"]', "content", "x")).not.toThrow();
  });

  it("overwrites existing attribute value", () => {
    const meta = document.createElement("meta");
    meta.setAttribute("content", "old");
    document.head.appendChild(meta);
    setMetaContent("meta[content='old']", "content", "new");
    expect(meta.getAttribute("content")).toBe("new");
  });
});
