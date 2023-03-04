import { Attribute, RerenderListType } from "../../type/type";
import { $ } from "../../utils/Dom";

class Select {
  attribute: Attribute;
  options: string[];

  constructor(attribute: Attribute, options: string[]) {
    this.attribute = attribute;
    this.options = options;
  }

  addEvent(id: string, rerenderList: RerenderListType) {
    const selectEl = $(`#${id}`);
    selectEl?.addEventListener("change", () => {
      const select = selectEl as HTMLSelectElement;
      const selectedOption = select.options[select.selectedIndex];

      rerenderList(id, selectedOption.value);
    });
  }

  template() {
    return ` 
    <select name=${this.attribute.name} id=${this.attribute.id} class=${
      this.attribute.className
    } required=${this.attribute.required}>
    ${this.options
      .map((option: string, index: number) =>
        index
          ? `<option value='${option}'> ${option} </option>`
          : `<option value=''> ${option}</option>`
      )
      .join("")}
    </select>`;
  }
}

export default Select;
