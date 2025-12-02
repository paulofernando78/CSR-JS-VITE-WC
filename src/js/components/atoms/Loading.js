const css = /* css */`
  .loading-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      opacity: 0.8;
      font-weight: bold
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 4px solid #555;
      border-top-color: #999;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
`

class Loading extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */`
      <style>${css}</style>
      <div class="loading-container">
        <div class="spinner"></div>
        <span>Loading...</span>
      </div>
    `;
  }
}

customElements.define("wc-loading", Loading);