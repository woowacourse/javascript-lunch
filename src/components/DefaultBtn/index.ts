import './style.css';

type Color = 'red' | 'white';

class AddBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const color = this.getAttribute('color') as Color;
    const text = this.getAttribute('text');

    this.innerHTML = `             
      <button
        type="button"
        class='btn-color-${color}'
      >
        ${text}
      </button>
    `;
  }
}
customElements.define('default-btn', AddBtn);
