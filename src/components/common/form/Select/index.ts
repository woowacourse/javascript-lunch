import { define } from '../../../decorators';
import FormControlComponent from '../../../FormControlComponent';
import formControlStyle from '../index.css';
import style from './index.css';

interface SelectOption<Value> {
  value: Value;
  label: string;
}

@define('r-select')
class Select<OptionValue> extends FormControlComponent {
  #options: SelectOption<OptionValue>[] = [];

  #selectedOption: SelectOption<OptionValue> | null = null;

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), formControlStyle, style];
  }

  setOptions(options: SelectOption<OptionValue>[]) {
    this.#options = options;

    this.render();
  }

  getOptions() {
    return this.#options;
  }

  getSelectedOption() {
    return this.#selectedOption;
  }

  setSelectedOption(selectedOption?: SelectOption<OptionValue>) {
    this.#selectedOption = selectedOption ?? null;
    this.internals.setFormValue(String(selectedOption?.value ?? ''));

    const optionIndex = this.#options.findIndex((option) => option.value === selectedOption?.value);
    this.shadowRoot!.querySelector<HTMLSelectElement>('select')!.value = String(
      optionIndex === -1 ? 0 : optionIndex,
    );

    this.dispatchEvent(new CustomEvent('change'));
  }

  override renderTemplate() {
    return `
      <label for="form-control">${this.getAttribute('title') ?? ''}</label>
      <select id="form-control" onchange="this.host.onChange(event)">
        ${this.#options
          .map(({ label }, index) => {
            return `<option value="${index}">${label}</option>`;
          })
          .join('')}
      </select>
    `;
  }

  onChange(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      this.setSelectedOption(this.#options[Number(event.target.value)]);
    }
  }

  override validate() {
    if (this.hasAttribute('required') && !this.getSelectedOption()?.value) {
      this.internals.setValidity(
        { valueMissing: true },
        '옵션을 선택하여야 합니다.',
        this.shadowRoot?.querySelector('select') ?? undefined,
      );
      return;
    }
    this.internals.setValidity({});
  }

  override get value() {
    return String(this.#selectedOption?.value ?? '');
  }

  override formResetCallback() {
    this.setSelectedOption();
    this.internals.setValidity({});
  }
}

export default Select;
