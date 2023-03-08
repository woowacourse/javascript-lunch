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
    this.dispatchEvent(new CustomEvent('change'));
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

  override renderTemplate() {
    return `
      <style>
        select {
          padding: 8px;
          margin: 6px 0;

          border: 1px solid var(--grey-200);
          border-radius: 8px;

          font-size: 16px;
          width: 100%
        }
      </style>

      <select id="select">
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
      ?.querySelector<HTMLSelectElement>('#select')
      ?.addEventListener('change', (event) => {
        const $select = event?.target as HTMLSelectElement;
        this.setSelectedOption(this.#options[Number($select.value)]);
      });
  }
}

customElements.define('r-select', Select);

export default Select;
