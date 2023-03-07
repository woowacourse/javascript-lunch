import { Attribute, Category, SetSelectedValue, Sort } from "@/type/type";
import { objectToAttributeString } from "@/utils/convertor";
import { $ } from "@/utils/Dom";

class Select {
  attribute: string;
  options: string[];

  constructor(attribute: Attribute, options: string[]) {
    this.attribute = objectToAttributeString(attribute);
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
    <select ${this.attribute}>
    ${this.makeOptionTemplate()}
    </select>`;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  makeOptionTemplate() {
    return this.options
      .map((option: string) => `<option value='${option}'> ${option} </option>`)
      .join("");
  }
}

export default Select;
