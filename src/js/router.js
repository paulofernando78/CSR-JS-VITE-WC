// 1. routes
// 2. currentPath
// 3. renderToken
// 4. renderRoute()
// 5. prefetch
// 6. navigateTo()
// 7. popstate listener

/*
 * ROUTE TABLE
 * Maps URL paths to their corresponding Web Component tag
 * and a loader function that dynamically imports the page module.
 * This enables code-splitting and lazy loading.
 */
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

/*
 * currentPath
 * Tracks the currently-rendered route so we don't re-render the same page unnecessarily.
 */
let currentPath = null;

/*
 * renderToken
 * Incremented on each navigation.
 * Used to prevent race conditions when multiple imports compete:
 * only the latest navigation should render.
 */
let renderToken = 0;

function updateAriaCurrent() {
  const links = document.querySelectorAll("a[data-link]");

  links.forEach((link) => {
    if (link.getAttribute("href") === window.location.pathname) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/*
 * renderRoute()
 * Main router function responsible for:
 * 1. Detecting the current path
 * 2. Matching it to a route
 * 3. Running fade-out transition
 * 4. Dynamically importing the page module
 * 5. Rendering the new Web Component
 * 6. Running fade-in transition
 */
export async function renderRoute() {
  // Read the current browser path (e.g. "/about")
  const app = document.querySelector("#app");
  let path = window.location.pathname; // Current route path
  path = path.toLowerCase();

  // If the path does not exist in our route table, fallback to 404
  if (!routes[path]) path = 404;

  // Optimization: avoid re-rendering if the user is already on this route
  if (path === currentPath) return;
  currentPath = path;

  // Extract the Web Component tag and the loader function for this route
  const { tag, load } = routes[path];

  // Increase token to invalidate older navigations (race condition protection)
  const token = ++renderToken;

  const loadingElement = document.createElement("wc-loading");
  app.replaceChildren(loadingElement);

  // Dynamically import the page module (code-splitting)
  // This may briefly block the event loop
  await load();

  // If the user navigated again during import, cancel this render
  if (token !== renderToken) return;

  // Create the new page's Web Component and replace the #app content
  const page = document.createElement("div");
  page.classList.add("page-container");

  const element = document.createElement(tag);
  page.appendChild(element);

  app.replaceChildren(page);

  updateAriaCurrent();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/*
 * PREFETCH SYSTEM
 * When the user hovers or focuses on a link, we proactively
 * preload the module for that route. This makes navigation faster.
 */
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

// Desktop prefetch: preload route module when mouse hovers a link
document.addEventListener(
  "mouseenter",
  (e) => {
    if (!(e.target instanceof Element)) return;
    const link = e.target.closest("[data-link]");
    if (link) prefetch(link.getAttribute("href"));
  },
  true // capture
);

// Keyboard/mobile accessibility prefetch: triggers on focus
document.addEventListener("focusin", (e) => {
  if (!(e.target instanceof Element)) return;
  const link = e.target.closest("[data-link]");
  if (link) prefetch(link.getAttribute("href"));
});

/*
 * navigateTo(path)
 * Pushes a new URL to the history and calls renderRoute()
 * Allows internal navigation without full page reloads.
 */
export function navigateTo(path) {
  // Updates the browser's URL (History API)
  window.history.pushState({}, "", path);
  renderRoute();
}

// Handle browser Back/Forward — re-renders route on history change
window.addEventListener("popstate", renderRoute);
