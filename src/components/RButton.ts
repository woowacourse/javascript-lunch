import RFormControl from './RFormControl';

class RButton extends RFormControl {
  constructor() {
    super();

    this.addEventListener('click', (event) => {
      if (this.getAttribute('type') === 'submit') {
        if (this.form !== null) this.form.requestSubmit();
      }
    });
  }

  get value() {
    return this.getAttribute('type') ?? '';
  }

  renderTemplate(): string {
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

customElements.define('r-button', RButton);

export default RButton;
