import FormControlComponent from '../FormControlComponent';

class Button extends FormControlComponent {
  constructor() {
    super();

    this.addEventListener('click', () => this.onClick());
  }

  onClick() {
    // type이 submit일 때 폼이 제출되도록 구현
    if (this.getAttribute('type') === 'submit' && this.form instanceof HTMLFormElement) {
      this.form.requestSubmit();
    }
  }

  override get value() {
    return this.getAttribute('type') ?? '';
  }

  override renderTemplate() {
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

        :host([variant="primary"]) > button {
          background: var(--primary-color);
          color: var(--grey-100);
        }
        
        :host([variant="secondary"]) > button {
          border: 1px solid var(--grey-300);
          background: transparent;

          color: var(--grey-300);
        }
      </style>

      <button type="button" class="text-caption">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('r-button', Button);

export default Button;
