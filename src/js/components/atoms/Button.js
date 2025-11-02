import styleImports from "@css/imports.css?inline";
import styleButton from "@css/components/button.css?inline";
import { menu, lightMode, darkMode } from "../../../assets/images/svg-imports";

class Button extends HTMLElement {
  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, styleButton].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });

    this.button = document.createElement("button");
    this.shadowRoot.appendChild(this.button);
  }

  connectedCallback() {
    this.updateIcon();

    this.button.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("nav-click", {
          bubbles: true,
          composed: true
        })
      );
    });
  }

  attributeChangedCallback(name) {
    if (name === "icon") this.updateIcon();
  }

  updateIcon() {
    const icons = { menu, lightMode, darkMode };
    const iconAttr = this.getAttribute("icon");
    this.button.innerHTML = icons[iconAttr] || "";
  }
}

export default Button;
