import { Attribute } from "../../type/type";
import { $ } from "../../utils/Dom";

class Select {
  attribute: Attribute;
  options: string[];

  constructor(attribute: Attribute, options: string[]) {
    this.options = options;
    this.attribute = attribute;
  }

  addEvent(id: string) {
    const selectEl = $(`#${id}`);
    selectEl?.addEventListener("change", () => {
      const select = selectEl as HTMLSelectElement;
      const selectedOption = select.options[select.selectedIndex];
      console.log(selectedOption);
    });
  }

  template() {
    return ` <select name=${this.attribute.name} id=${
      this.attribute.id
    } class=${this.attribute.className} required=${this.attribute.required}>
    ${this.options
      .map((option: string, index: number) =>
        !index
          ? `<option value=''> ${option}</option>`
          : `<option value='${option}'> ${option} </option>`
      )
      .join("")}
  </select>`;
  }
}

export default Select;
