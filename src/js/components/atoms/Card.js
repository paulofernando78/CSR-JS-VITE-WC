import styleImports from "@css/styles.css?inline";

const style = /* css */ `
  :host {
  }
  
  .card-container {
    padding: 5px; 
    border: var(--border);
    border-radius: var(--border-radius)
    
  }

  ::slotted(*) {
    // background-color: red
  }
`

class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        ${styleImports}
        ${style}

        
      </style>
      <div class="card-container">
        <slot></slot>
      </div>
    `;
  }
}

export default Card;

