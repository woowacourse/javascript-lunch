import FormControlComponent from '../FormControlComponent';

interface SelectOption<Value> {
  value: Value;
  label: string;
}

class Select<OptionValue> extends FormControlComponent {
  #options: SelectOption<OptionValue>[] = [];

  #selectedOption: SelectOption<OptionValue> | null = null;

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
      <style>
        :host {
          display: block;
          position: relative;
        }

        select {
          display: block;
          padding: 8px;
          margin: 6px 0;

          border: 1px solid var(--grey-200);
          border-radius: 8px;

          font-size: 16px;
          width: 100%
        }

        label {
          font-size: 14px;
          color: var(--grey-400);
        }

        :host([required]) label::after {
          padding-left: 4px;
          content: '*';
          color: var(--primary-color);
        }

        :host::after {
          position: absolute;
          top: 100%;
          font-size: 0.8rem;
        }

        :host(:valid)::after {
          content: attr(helper-text);
          color: var(--grey-300);
        }

        :host(:invalid) select {
          border-color: red;
          box-shadow: 0 0 5px rgba(255, 0, 0, 0.3);
        }

        :host(:invalid)::after {
          content: attr(validation-message);
          color: red;
        }
      </style>

      <label>${this.getAttribute('title') ?? ''}</label>
      <select>
        ${this.#options
          .map(({ label }, index) => {
            return `<option value="${index}">${label}</option>`;
          })
          .join('')}
      </select>
    `;
  }

  override render() {
    super.render();

    this.shadowRoot
      ?.querySelector<HTMLSelectElement>('select')
      ?.addEventListener('change', (event) => {
        const $select = event?.target as HTMLSelectElement;
        this.setSelectedOption(this.#options[Number($select.value)]);
      });
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

  formResetCallback() {
    this.setSelectedOption();
    this.internals.setValidity({});
  }
}

customElements.define('r-select', Select);

export default Select;
