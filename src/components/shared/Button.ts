import CustomFormElement from '../CustomFormElement';

class Button extends CustomFormElement {
  constructor() {
    super();
  }

  get variant() {
    return this.getAttribute('variant');
  }

  get action() {
    return this.getAttribute('action');
  }

  renderTemplate() {
    return `
      <style>
        button {
          width: 100%;
          height: 44px;

          margin-right: 16px;

          border: none;
          border-radius: 8px;

          font-weight: 600;
          cursor: pointer;    
        }

        button[variant="primary"] {
          background: var(--primary-color);
          color: var(--grey-100);
        }
        
        button[variant="secondary"] {
          border: 1px solid var(--grey-300);
          background: transparent;

          color: var(--grey-300);
        }
      </style>

      <button 
        ${this.action ? `action=${this.action}` : ''} 
        variant=${this.variant} 
        class="text-caption"
      >
        ${this.name}
      </button>
    `;
  }

  render() {
    super.render();

    this.addEventListener('click', (event: Event) => {
      event.preventDefault();

      if (!this.action) return;

      this.dispatchEvent(new CustomEvent(this.action, { bubbles: true }));
    });
  }
}

customElements.define('r-button', Button);

export default Button;