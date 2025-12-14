import styleImports from "@css/styles.css?inline";

class About extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render()
  }

  render() {
    /* html */ 
    this.shadowRoot.innerHTML = `
      <style>${styleImports}</style>
      <section class="line-break">
        <h1>About Page</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti odio iusto odit ratione exercitationem non nemo quas excepturi necessitatibus animi numquam in beatae voluptates vitae aperiam, magni harum quam enim.</p>
      </section>
      
    `
  }
}

export default About;
customElements.define("wc-about", About)