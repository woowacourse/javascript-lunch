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
