class Button extends HTMLElement {
  attributeChangedCallback(name) {
    if (name === 'name' && name === 'color' && name === 'id') {
      this.connectedCallback();
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .text-caption {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
      }

      button {
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

      @media (max-width: 500px) {
        button {
          width: 150px;
          height: 44px;
        
          margin-right: 16px;
        
          border: none;
          border-radius: 8px;
        
          font-weight: 600;
          cursor: pointer;
        }
      }

    
      
`;

    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const color = this.getAttribute('color');

    this.shadowRoot.innerHTML = `
    <button type="button" id=${id} class="button--${color} text-caption">${name}</button>
    `;

    this.shadowRoot.append(componentStyle);
  }

  static get observedAttributes() {
    return ['name', 'color', 'id'];
  }
}

export default Button;
