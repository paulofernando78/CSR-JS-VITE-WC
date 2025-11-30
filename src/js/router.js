// 1. rotas
// 2. currentPath
// 3. renderToken
// 4. renderRoute()
// 5. prefetch
// 6. navigateTo()
// 7. popstate listener

const routes = {
  "/": {
    tag: "wc-home",
    load: () => import("../pages/Home.js"),
  },
  "/about": {
    tag: "wc-about",
    load: () => import("../pages/About.js"),
  },
  "/contact": {
    tag: "wc-contact",
    load: () => import("../pages/Contact.js"),
  },
  404: {
    tag: "wc-404",
    load: () => import("../pages/404.js"),
  },
};

let currentPath = null;
let renderToken = 0;

export async function renderRoute() {
  const app = document.querySelector("#app");
  let path = window.location.pathname; // Current route path
  path = path.toLowerCase();

  if (!routes[path]) path = 404;
  if (path === currentPath) return;
  currentPath = path;

  const { tag, load } = routes[path];

  // TOKEN PARA EVITAR RACE CONDITION
  const token = ++renderToken;

  app.classList.add("fade");
  await new Promise((resolve) => setTimeout(resolve, 100));

  await load();

  // CANCELA SE OUTRA ROTA FOI CLICADA DURANTE O IMPORT
  if (token !== renderToken) return;

  const element = document.createElement(tag);
  app.replaceChildren(element);

  requestAnimationFrame(() => {
    app.classList.remove("fade");
  });
}

// Pre-fetch
const prefetchRoutes = new Set();

function prefetch(path) {
  if (!routes[path]) return;
  if (prefetchRoutes.has(path)) return;

  prefetchRoutes.add(path);

  routes[path].load().catch((err) => {
    console.warn(`Falha no prefetch de ${path}:`, err);
    prefetchRoutes.delete(path);
  });
}

// Prefetch via mouse (Desktop)
document.addEventListener(
  "mouseenter",
  (e) => {
    if (!(e.target instanceof Element)) return;
    const link = e.target.closest("[data-link]");
    if (link) prefetch(link.getAttribute("href"));
  },
  true // capture
);

// Prefetch via keyboard focus (A11Y + mobile)
document.addEventListener("focusin", (e) => {
  if (!(e.target instanceof Element)) return;
  const link = e.target.closest("[data-link]");
  if (link) prefetch(link.getAttribute("href"));
});

// Used for navigation without page reload
export function navigateTo(path) {
  // Updates the browser's URL (History API)
  window.history.pushState({}, "", path);
  renderRoute();
}

// Handles browser navigation (Back/Forward buttons)
window.addEventListener("popstate", renderRoute);
