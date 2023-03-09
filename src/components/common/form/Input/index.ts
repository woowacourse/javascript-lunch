import FormControlComponent from '../../../FormControlComponent';
import formControlStyle from '../index.css';
import style from './index.css';

class Input extends FormControlComponent {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), formControlStyle, style];
  }

  override renderTemplate() {
    return `
      <label for="form-control">${this.getAttribute('title') ?? ''}</label>
      <input id="form-control" oninput="this.host.onInput(event)">
    `;
  }

  onInput(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      this.internals.setFormValue(event.target.value);
    }
  }

  override validate() {
    if (this.hasAttribute('required') && !this.value) {
      this.internals.setValidity(
        { valueMissing: true },
        '값을 입력해야 합니다.',
        this.shadowRoot?.querySelector('input') ?? undefined,
      );
      return;
    }
    this.internals.setValidity({});
  }

  override get value() {
    return this.shadowRoot?.querySelector<HTMLInputElement>('input')?.value ?? '';
  }

  override formResetCallback() {
    this.shadowRoot!.querySelector<HTMLInputElement>('input')!.value = '';
    this.internals.setValidity({});
  }
}

customElements.define('r-input', Input);

export default Input;
