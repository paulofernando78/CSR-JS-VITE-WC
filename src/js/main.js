import "@js/app.js";
import "@css/styles.css";
import "@utils/componentsImport.js"

// Restore Theme on Page Load
const savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);

// Dark Mode
const darkModeBtn = document.querySelector("wc-button[icon='darkMode']");
if (darkModeBtn) {
  darkModeBtn.setAttribute(
    "icon",
    savedTheme === "dark" ? "lightMode" : "darkMode"
  );
}

darkModeBtn.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme");

  // Is current theme dark? When clicked use light, otherwise use dark
  const newTheme = current === "dark" ? "light" : "dark";

  // Apply Theme
  document.body.setAttribute("data-theme", newTheme);

  //Save Theme
  localStorage.setItem("theme", newTheme);

  // Will New theme be dark? If yes, use lightMode, otherwise use darkMode
  darkModeBtn.setAttribute(
    "icon",
    newTheme === "dark" ? "lightMode" : "darkMode"
  );
});

const menuBtn = document.querySelector("wc-button[icon='menu']");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav li a");

menuBtn.addEventListener("nav-click", () => {
  const isOpen = nav.classList.toggle("visible");
  menuBtn.toggleHamIcon(isOpen);
});

nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("visible");
    menuBtn.toggleHamIcon(false);
  }
});

// Breakpoint animation
const mq = window.matchMedia("(max-width: 700px)");

function handleBreakpoint(e) {
  if (e.matches) {
    nav.classList.remove("visible");
  }
}

mq.addEventListener("change", handleBreakpoint);
handleBreakpoint(mq);
