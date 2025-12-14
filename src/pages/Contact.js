import styleImports from "@css/styles.css?inline";

class Contact extends HTMLElement {
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
        ${styleImports};
      </style>
      <section class="line-break test">
        <h1>Contact Page</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti odio iusto odit ratione exercitationem non nemo quas excepturi necessitatibus animi numquam in beatae voluptates vitae aperiam, magni harum quam enim.</p>
      </section>
    `;
  }
}

export default Contact;
customElements.define("wc-contact", Contact)
