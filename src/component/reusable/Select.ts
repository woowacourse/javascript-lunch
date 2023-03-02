import { $ } from "../../utils/Dom";

interface Attribute {
  id: string;
  className: string;
  name: string;
  required?: boolean;
}

class Select {
  options: string[];
  name: string;
  id: string;
  className: string;
  required: boolean | undefined;
  selectedValue: string;

  constructor(attribute: Attribute, options: string[]) {
    this.options = options;
    const { name, id, className, required } = attribute;
    this.name = name;
    this.id = id;
    this.className = className;
    this.required = required;
    this.selectedValue = "";
  }

  addEvent(id: string) {
    const selectEl = $(`#${id}`);
    selectEl?.addEventListener("change", () => {
      const select = selectEl as HTMLSelectElement;
      const selectedOption = select.options[select.selectedIndex];

      this.selectedValue = selectedOption.value;
    });
  }

  template() {
    return ` <select name=${this.name} id=${this.id} class=${
      this.className
    } required=${this.required}>
    ${this.options
      .map((option: string) => `<option value=${option}> ${option} </option>`)
      .join("")}
  </select>`;
  }

  getSelctedValue() {
    return this.selectedValue;
  }
}

export default Select;
