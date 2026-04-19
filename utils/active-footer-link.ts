export function activeFooterLink(path: string) {
  const links = document.querySelectorAll(".app-site-nav__link");
  links.forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}