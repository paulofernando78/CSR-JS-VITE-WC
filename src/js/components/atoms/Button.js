import styleImports from "@css/styles.css?inline";

const style = /* css */`
  :host {
    display: inline-block;
  }

  :host([icon="darkMode"]) svg,
  :host([icon="lightMode"]) svg {
    animation: fadeIn 0.4s;
  }

  :host([icon="lightMode"]) svg {
    filter: none;
    fill: var(--yellow-3);
  }

  button {
    all: unset;
    cursor: pointer;
    padding: 5px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.6);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

import { menu, lightMode, darkMode } from "../../../assets/images/svg-imports";

class Button extends HTMLElement {
  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        ${styleImports}
        ${style}
      </style>
      <button></button>
    `;

    this.button = this.shadowRoot.querySelector("button");
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
