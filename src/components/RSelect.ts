import RFormControl from './RFormControl';

interface RSelectOption {
  value: number | string | boolean;
  label: string;
}

class RSelect extends RFormControl {
  #options: RSelectOption[] = [];

  #selectedOption: RSelectOption | null = null;

  setOptions(options: RSelectOption[]) {
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

  setSelectedOption(selectedOption: RSelectOption) {
    this.#selectedOption = selectedOption;
  }

  renderTemplate(): string {
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

      <select>
        ${this.#options
          .map(({ value, label }) => {
            return `<option value="${value}">${label}</option>`;
          })
          .join('')}
      </select>
    `;
  }
}

customElements.define('r-select', RSelect);

export default RSelect;