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

export async function renderRoute() {
  const app = document.querySelector("#app");
  let path = window.location.pathname; // Current route path

  if (!routes[path]) path = 404;

  if (path === currentPath) return;
  currentPath = path;

  const { tag, load } = routes[path];

  await load();

  const element = document.createElement(tag);
  app.replaceChildren(element);
}

// 👇 Used for navigation without page reload
export function navigateTo(path) {
  // Updates the browser's URL (History API)
  window.history.pushState({}, "", path);
  renderRoute();
}

// 👇 Handles browser navigation (Back/Forward buttons)
window.addEventListener("popstate", renderRoute);
