import { GLOBAL_CSS } from '../constants';
class Button extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
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

    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const color = this.getAttribute('color');

    this.shadowRoot.innerHTML = `
    <button type="button" id=${id} class="button button--${color} text-caption">${name}</button>
    `;

    this.shadowRoot.append(globalStyle, componentStyle);
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
