import styleImports from "@css/styles.css?inline";


const style = /* css */ `
  h2 {
    font-size: 1.8rem
  }
`;

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
      <style>
        ${styleImports}
        ${style}
      </style>
      <section class="line-break home-container" aria-label="Boilerplate">
        <div>
          <h1 class="page"><b>CSR</b> </h1>
          <h2>(Client Side Rendering)</h2>
        </div>
        <div>
          <ul>
            <li>• JS Vanilla</li>
            <li>• Vite</li>
            <li>• Web Components</li>
          </ul>
        </div>
        <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur quis quisquam ipsum qui, minus odio quam vero sunt harum cumque optio pariatur sint, ducimus ullam delectus omnis aliquid possimus! Perferendis.
        </p>
        <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur quis quisquam ipsum qui, minus odio quam vero sunt harum cumque optio pariatur sint, ducimus ullam delectus omnis aliquid possimus! Perferendis.
        </p>
        <wc-card>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur quis quisquam ipsum qui, minus odio quam vero sunt harum cumque optio pariatur sint, ducimus ullam delectus omnis aliquid possimus! Perferendis.</p>
        </wc-card>
        
      </section>
    `;
  }
}

export default Home;

customElements.define("wc-home", Home);
