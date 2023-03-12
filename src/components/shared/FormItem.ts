import CustomFormElement from '../CustomElement';

class FormItem extends CustomFormElement {
  private get label() {
    return this.getAttribute('label');
  }

  private get helperText() {
    return this.getAttribute('helper-text');
  }

  private get required() {
    return this.hasAttribute('required');
  }

  renderTemplate(): string {
    return `
      <div>
        <label class="text-caption ${this.required ? 'required' : ''} label-main-text">
          ${this.label ?? ''}
        </label>
        ${this.innerHTML}
        <span class="text-caption label-helper-text">
          ${this.helperText ?? ''}
        </span>
      </div>
    `;
  }
}

customElements.define('r-form-item', FormItem);

export default FormItem;
