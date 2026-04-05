import { describe, test, expect, beforeEach, afterEach, afterAll, jest, mock } from "bun:test";
import * as routerTemplate from "../router/router.template";
import { routerState } from "../router/router.state";

mock.module("@features/meta/meta.ctrl", () => ({
  metaCtrl: { updateMeta: () => {}, init: () => {} },
}));

const { handleRouteChange, handleLinkClick, resetRouterViewCacheForTests } = await import("../router/router.handlers");

// Mock renderTemplate
const mockRenderTemplate = jest.fn();
jest.spyOn(routerTemplate, "renderTemplate").mockImplementation(mockRenderTemplate);

describe("router.handlers", () => {
  beforeEach(() => {
    resetRouterViewCacheForTests();
    document.body.innerHTML = `
      <main></main>
      <title></title>
      <template id="test-template">Test content</template>
      <template id="ctrl-template">Ctrl content</template>
      <template id="no-ctrl-template">No ctrl content</template>
    `;
    routerState.onRouteChange = undefined;
    routerState.currentPage = "/";
    routerState.cleanUp = undefined;
    mockRenderTemplate.mockClear();
  });

  afterEach(() => {
    mockRenderTemplate.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should update the document title and render the template", async () => {
    const route = {
      title: "Test Page",
      templateId: "test-template",
    };
    await handleRouteChange(route as any);
    expect(document.title).toBe("Test Page");
    expect(mockRenderTemplate).toHaveBeenCalledWith("test-template");
  });

  test("should call ctrl.init and set cleanUp", async () => {
    const ctrl = {
      init: jest.fn(),
      cleanUp: jest.fn(),
    };
    const route = {
      title: "With Ctrl",
      templateId: "ctrl-template",
      ctrl,
    };
    await handleRouteChange(route as any);
    expect(ctrl.init).toHaveBeenCalled();
    expect(routerState.cleanUp).toBe(ctrl.cleanUp);
  });

  test("should handle missing ctrl gracefully", async () => {
    const route = {
      title: "No Ctrl",
      templateId: "no-ctrl-template",
    };
    await expect(handleRouteChange(route as any)).resolves.toBeUndefined();
    expect(routerState.cleanUp).toBeUndefined();
  });

  test("should update currentPage and pushState on internal link click", () => {
    const pushState = jest.spyOn(window.history, "pushState").mockImplementation(() => {});
    document.body.innerHTML += `<a href="/fr/about" data-internal>About</a>`;
    const link = document.querySelector("a")!;
    const event = { preventDefault: jest.fn(), target: link } as any;
    handleLinkClick(event);
    expect(routerState.currentPage).toBe("/fr/about");
    expect(pushState).toHaveBeenCalledWith({}, "", "/fr/about");
    pushState.mockRestore();
  });

  test("should default to '/' if href is missing on internal link", () => {
    document.body.innerHTML += `<a data-internal>x</a>`;
    const link = document.querySelector("a")!;
    const event = { preventDefault: jest.fn(), target: link } as any;
    handleLinkClick(event);
    expect(routerState.currentPage).toBe("/");
  });

  test("does nothing when click is not on an internal link", () => {
    document.body.innerHTML += `<div id="x"></div>`;
    const el = document.getElementById("x")!;
    const preventDefault = jest.fn();
    const event = { preventDefault, target: el } as any;
    handleLinkClick(event);
    expect(preventDefault).not.toHaveBeenCalled();
  });

  test("ne rappelle pas renderTemplate si même template et même pathname (ex. query seule)", async () => {
    const prev = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...prev, pathname: "/fr/recipes", search: "?transport=easy" },
    });
    try {
      resetRouterViewCacheForTests();
      document.body.innerHTML = `
      <main></main>
      <title></title>
      <template id="dup-template"><div>dup</div></template>
    `;
      const ctrl1 = { init: jest.fn(), cleanUp: jest.fn() };
      await handleRouteChange({ title: "A", templateId: "dup-template", ctrl: ctrl1 } as any);
      expect(mockRenderTemplate).toHaveBeenCalledTimes(1);
      mockRenderTemplate.mockClear();
      const ctrl2 = { init: jest.fn(), cleanUp: jest.fn() };
      await handleRouteChange({ title: "B", templateId: "dup-template", ctrl: ctrl2 } as any);
      expect(mockRenderTemplate).not.toHaveBeenCalled();
      expect(ctrl2.init).toHaveBeenCalled();
    } finally {
      Object.defineProperty(window, "location", { configurable: true, value: prev });
    }
  });
});
