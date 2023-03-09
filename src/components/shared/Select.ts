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
