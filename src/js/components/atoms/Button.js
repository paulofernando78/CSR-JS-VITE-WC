import styleImports from "@css/styles.css?inline";

const style = /* css */ `
  :host {
    display: grid;
    place-items: center;
  }

  .ham_menu {
    display: flex;
    flex-direction: column;
    gap: 3px;
    transform: translateX(1px);
  }

  .ham_menu span {
    width: 20px;
    height: 3px;
    background: var(--menu-button);
    border-radius: 5px;
    transition: 0.3s;
  }

  .line1-active {
    transform: translateY(6px) translateX(-3px) rotate(45deg);
  }

  .line2-active {
    opacity: 0;
  }

  .line3-active {
    transform: translateY(-6px) translateX(-3px) rotate(-45deg);
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
`;

import { lightMode, darkMode } from "../../../assets/images/svg-imports";

class Button extends HTMLElement {
  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = /* html*/ `
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
          composed: true,
        })
      );
    });
  }

  attributeChangedCallback(name) {
    if (name === "icon") this.updateIcon();
  }

  updateIcon() {
    const iconAttr = this.getAttribute("icon");

    if (iconAttr === "menu") {
      this.button.innerHTML = /* html */ `
        <div class="ham_menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;

      const ham = this.shadowRoot.querySelector(".ham_menu");
      const spans = ham.querySelectorAll("span");

      this.button.addEventListener("click", () => {
        spans[0].classList.toggle("line1-active");
        spans[1].classList.toggle("line2-active");
        spans[2].classList.toggle("line3-active");
      });
    } else {
      const icons = { lightMode, darkMode };
      this.button.innerHTML = icons[iconAttr] || "";
    }
  }
}

export default Button;
