import styleImports from "@css/styles.css?inline";

const style = /* css */`
  .not-found {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: var(--padding);
  }
`
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
        ${style}
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
