import { Category, Sort } from "./../../types/type";
import { Attribute, RerenderListType } from "../../types/type";
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
    selectEl?.addEventListener("change", (event) => {
      const selectedOption = (<HTMLSelectElement>event.target).value as
        | Category
        | Sort;

      rerenderList(id, selectedOption);
    });
  }

  renderOption() {
    return this.options
      .map((option: string, index: number) =>
        index
          ? `<option value='${option}'> ${option} </option>`
          : `<option value=''> ${option}</option>`
      )
      .join("");
  }

  template() {
    return ` 
    <select name=${this.attribute.name} id=${this.attribute.id} class=${
      this.attribute.className
    } required=${this.attribute.required}>
    ${this.renderOption()}
    </select>`;
  }
}

export default Select;
