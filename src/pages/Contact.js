import styleImports from "@css/imports.css?inline";
import styleContact from "@css/pages/contact.css?inline";

class Contact extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, styleContact].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });

    this.container = document.createElement("div");
    this.container.className = "line-break";
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    /* html */
    this.container.innerHTML = `
      <h1>Contact Page</h1>\<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti odio iusto odit ratione exercitationem non nemo quas excepturi necessitatibus animi numquam in beatae voluptates vitae aperiam, magni harum quam enim.</p>
    `;
  }
}

export default Contact;
