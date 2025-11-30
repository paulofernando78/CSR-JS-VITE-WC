import { navigateTo, renderRoute } from "./router";

// Run router when the page first loads
document.addEventListener("DOMContentLoaded", renderRoute);

// Intercept link clicks
document.addEventListener("click", (e) => {
  if (!(e.target instanceof Element)) return;

  const link = e.target.closest("[data-link]");
  if (!link) return;

  e.preventDefault();
  const path = link.getAttribute("href");
  navigateTo(path);
});
