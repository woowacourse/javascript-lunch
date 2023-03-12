import CustomFormElement from '../CustomFormElement';

class Button extends CustomFormElement {
  private get variant() {
    return this.getAttribute('variant');
  }

  private get action() {
    return this.getAttribute('action');
  }

  renderTemplate() {
    return `
      <style>
        .modal-button {
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
        type=${this.type}
        action=${this.action}
        variant=${this.variant} 
        class="text-caption modal-button"
      >
        ${this.name}
      </button>
    `;
  }
}

customElements.define('r-button', Button);

export default Button;
