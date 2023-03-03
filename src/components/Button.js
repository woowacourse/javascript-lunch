import { GLOBAL_CSS } from '../constants';
class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const globalStyle = document.createElement('style');
    const componentStyle = document.createElement('style');
    globalStyle.textContent = GLOBAL_CSS;
    componentStyle.textContent = `
    .button {
        width: 171px;
        height: 44px;
      
        margin-right: 16px;
      
        border: none;
        border-radius: 8px;
      
        font-weight: 600;
        cursor: pointer;
      }
      
      .button--white {
        border: 1px solid var(--grey-300);
        background: transparent;
      
        color: var(--grey-300);
      }
      
      .button--orange {
        background: var(--primary-color);
      
        color: var(--grey-100);
      }
      
`;

    const template = document.createElement('template');

    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const color = this.getAttribute('color');

    template.innerHTML = `
    <button type="button" id=${id} class="button button--${color} text-caption">${name}</button>
    `;

    const cloneNode = template.content.cloneNode(true);

    this.shadowRoot.appendChild(globalStyle);
    this.shadowRoot.appendChild(componentStyle);
    this.shadowRoot.appendChild(cloneNode);
  }

  static get observedAttributes() {
    return ['name', 'color', 'id'];
  }

  attributeChangedCallback(name) {
    if (name === 'name' && name === 'color' && name === 'id') {
      this.connectedCallback();
    }
  }
}

export default Button;
