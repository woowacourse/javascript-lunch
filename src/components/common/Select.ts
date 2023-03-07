import FormControlComponent from '../FormControlComponent';

interface SelectOption {
  value: number | string | boolean;
  label: string;
}

class Select extends FormControlComponent {
  #options: SelectOption[] = [];

  #selectedOption: SelectOption | null = null;

  setOptions(options: SelectOption[]) {
    this.#options = options;
    this.#selectedOption = null;

    this.render();
  }

  getOptions() {
    return this.#options;
  }

  getSelectedOption() {
    return this.#selectedOption;
  }

  setSelectedOption(selectedOption: SelectOption) {
    this.#selectedOption = selectedOption;
    this.internals.setFormValue(String(selectedOption.value));
    this.dispatchEvent(new CustomEvent('change'));
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
          .map(({ value, label }) => {
            return `<option value="${value}">${label}</option>`;
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
        this.setSelectedOption({
          value: $select.value,
          label: this.#options.find((option) => option.value === $select.value)?.label as string,
        });
      });
  }
}

customElements.define('r-select', Select);

export default Select;
