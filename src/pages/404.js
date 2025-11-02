import styleImports from "@css/imports.css?inline";
import style404 from "@css/pages/404.css?inline";

class FourOhFour extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, style404].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });

    this.container = document.createElement("div");
    this.container.className = "container"
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    this.render()
  }

  render() {
    /* html */ 
    this.container.innerHTML = `
      <h1>404</h1>
      <h2>Page Not Found</h2>
    `
  }
}

export default FourOhFour;