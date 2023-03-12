import CustomFormElement from '../CustomElement';

class FormItem extends CustomFormElement {
  static useShadowDom(): boolean {
    return false;
  }

  renderTemplate(): string {
    return `
      <style>
        r-form-item > label {
          color: var(--grey-400);
        }

        r-form-item > span {
          color: var(--grey-300);
        }

        r-form-item label.required::after {
          padding-left: 4px;

          color: var(--primary-color);
          content: '*';
        }

        r-form-item > div {
          margin-bottom: 36px;
        }
      </style>

      <div>
        <label class="text-caption ${this.querySelector('[required]') ? 'required' : ''}">
          ${this.getAttribute('label') ?? ''}
        </label>
        ${this.innerHTML}
        <span class="text-caption">
          ${this.getAttribute('helper-text') ?? ''}
        </span>
      </div>
    `;
  }
}

customElements.define('r-form-item', FormItem);

export default FormItem;