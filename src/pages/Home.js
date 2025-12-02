import styleImports from "@css/styles.css?inline";

class Home extends HTMLElement {
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
      <style>${styleImports}</style>
      <section class="line-break home-container" aria-label="Boilerplate">
        <h1 class="page">Boilerplate</h1>
        <p><b>CSR</b> (Client Side Rendering)</p>
        <div>
          <ul>
            <li>• JS Vanilla</li>
            <li>• Vite</li>
            <li>• Web Components</li>
          </ul>
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisici</p>
      </section>
    `;
  }
}

export default Home;

customElements.define("wc-home", Home)
