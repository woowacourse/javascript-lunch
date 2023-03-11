import { define } from '../../../decorators';
import FormControlComponent from '../../../FormControlComponent';
import formControlStyle from '../index.css';
import style from './index.css';

@define('r-textarea')
class Textarea extends FormControlComponent {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), formControlStyle, style];
  }

  override renderTemplate() {
    return `
      <label for="form-control">${this.getAttribute('title') ?? ''}</label>
      <textarea
        id="form-control"
        oninput="this.host.onInput(event)"
        rows="${this.getAttribute('rows') ?? 4}"
      ></textarea>
    `;
  }

  private onInput(event: InputEvent) {
    if (event.target instanceof HTMLTextAreaElement) {
      this.internals.setFormValue(event.target.value);
    }
  }

  override validate() {
    if (this.hasAttribute('required') && !this.value) {
      this.internals.setValidity(
        { valueMissing: true },
        '값을 입력해야 합니다.',
        this.shadowRoot?.querySelector('textarea') ?? undefined,
      );
      return;
    }
    this.internals.setValidity({});
  }

  override get value() {
    return this.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea')?.value ?? '';
  }

  override formResetCallback() {
    this.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!.value = '';
    this.internals.setValidity({});
  }
}

export default Textarea;
