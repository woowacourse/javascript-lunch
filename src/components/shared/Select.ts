import CustomFormElement from '../CustomFormElement';

interface SelectOption {
  value: number | string | boolean;
  label: string;
}

class Select extends CustomFormElement {
  #options: SelectOption[] = [];

  setInitialOptions(options: SelectOption[]) {
    this.#options = options;

    this.render();
  }

  renderTemplate() {
    return `
      <style>
        .r-select {
          padding: 8px;
          margin: 6px 0;

          border: 1px solid var(--grey-200);
          border-radius: 8px;

          font-size: 16px;
          width: 100%
        }
      </style>

      <select id="select" class="r-select" ${this.name && `name=${this.name}`}>
        ${this.#options
          .map(({ value, label }) => {
            return `<option value="${value}">${label}</option>`;
          })
          .join('')}
      </select>
    `;
  }
}

customElements.define('r-select', Select);

export default Select;
