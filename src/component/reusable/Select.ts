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
    selectEl?.addEventListener("change", (e) => {
      const select = e.target as HTMLSelectElement;
      const selectedOption = select.value;
      console.log(selectedOption);

      rerenderList(id, selectedOption);
    });
  }

  template() {
    return ` 
    <select name=${this.attribute.name} id=${this.attribute.id} class=${
      this.attribute.className
    } required=${this.attribute.required}>
    ${this.options
      .map((option: string) => `<option value='${option}'> ${option} </option>`)
      .join("")}
    </select>`;
  }
}

export default Select;
