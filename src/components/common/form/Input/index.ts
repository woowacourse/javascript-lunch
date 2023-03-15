import { define } from '../../../decorators';
import FormControlComponent from '../../../FormControlComponent';
import formControlStyle from '../index.css';
import style from './index.css';

@define('r-input')
class Input extends FormControlComponent {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), formControlStyle, style];
  }

  private onInput(event: Event) {
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

  override renderTemplate() {
    return `
      <label for="form-control">${this.getAttribute('title') ?? ''}</label>
      <input id="form-control">
    `;
  }

  override render() {
    super.render();

    this.initEventListeners();
  }

  private initEventListeners() {
    this.shadowRoot!.querySelector('input')?.addEventListener('input', (event) =>
      this.onInput(event),
    );
  }

  override get value() {
    return this.shadowRoot?.querySelector<HTMLInputElement>('input')?.value ?? '';
  }

  override formResetCallback() {
    this.shadowRoot!.querySelector<HTMLInputElement>('input')!.value = '';
    this.internals.setValidity({});
  }
}

export default Input;
