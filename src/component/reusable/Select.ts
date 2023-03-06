import { Attribute, Category, SetSelectedValue, Sort } from "@/type/type";
import { $ } from "@/utils/Dom";

class Select {
  attribute: Attribute;
  options: string[];

  constructor(attribute: Attribute, options: string[]) {
    this.attribute = attribute;
    this.options = options;
  }

  addEvent(sortId: string, setSelectedValue: SetSelectedValue) {
    const selectEl = $(`#${sortId}`);
    selectEl?.addEventListener("change", (e) => {
      const selectedOption = (e.target as HTMLSelectElement).value as
        | Category
        | Sort;
      setSelectedValue(sortId, selectedOption);
    });
  }

  template() {
    return ` 
    <select name=${this.attribute.name} id=${this.attribute.id} class=${
      this.attribute.className
    } required=${this.attribute.required}>
    ${this.makeOptionTemplate()}
    </select>`;
  }

  makeOptionTemplate() {
    return this.options
      .map((option: string) => `<option value='${option}'> ${option} </option>`)
      .join("");
  }
}

export default Select;
