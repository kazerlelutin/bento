import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { activeFooterLink } from "./active-footer-link";

describe("active-footer-link", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="app-footer-nav">
        <a class="app-site-nav__link" href="/">Accueil</a>
        <a class="app-site-nav__link" href="/favorites">Favoris</a>
        <a class="app-site-nav__link" href="/about">À propos</a>
      </nav>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("sets active class and aria-current on matching link", () => {
    activeFooterLink("/favorites");
    const links = document.querySelectorAll(".app-site-nav__link");
    const home = links[0];
    const fav = links[1];
    const about = links[2];
    expect(home.classList.contains("active")).toBe(false);
    expect(home.getAttribute("aria-current")).toBeNull();
    expect(fav.classList.contains("active")).toBe(true);
    expect(fav.getAttribute("aria-current")).toBe("page");
    expect(about.classList.contains("active")).toBe(false);
  });

  it("clears active from other links when path changes", () => {
    activeFooterLink("/favorites");
    activeFooterLink("/about");
    const links = document.querySelectorAll(".app-site-nav__link");
    expect(links[1].classList.contains("active")).toBe(false);
    expect(links[2].classList.contains("active")).toBe(true);
    expect(links[2].getAttribute("aria-current")).toBe("page");
  });

  it("handles home path", () => {
    activeFooterLink("/");
    const home = document.querySelector('.app-site-nav__link[href="/"]');
    expect(home?.classList.contains("active")).toBe(true);
    expect(home?.getAttribute("aria-current")).toBe("page");
  });
});
