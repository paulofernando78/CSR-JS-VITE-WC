import styleImports from "@css/styles.css?inline";

class FourOhFour extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    /* html */
    this.shadowRoot.innerHTML = `
      <style>
        ${styleImports}
      </style>
      <section class="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
      </section>
      
    `;
  }
}

export default FourOhFour;

customElements.define("wc-404", FourOhFour);
