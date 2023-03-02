import { Attribute } from "../../type/type";
import { $ } from "../../utils/Dom";

class Select {
  options: string[];
  attribute: Attribute;
  selectedValue: string;

  constructor(attribute: Attribute, options: string[]) {
    this.options = options;
    this.attribute = attribute;
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
    return ` <select name=${this.attribute.name} id=${
      this.attribute.id
    } class=${this.attribute.className} required=${this.attribute.required}>
    ${this.options
      .map((option: string) => `<option value=${option}> ${option} </option>`)
      .join("")}
  </select>`;
  }

  getSelectedValue() {
    return this.selectedValue;
  }
}

export default Select;
