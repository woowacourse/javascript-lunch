import { Attribute, Category, SetSelectedValue, Sort } from "@/type/type";
import { convertHtmlAttribute } from "@/utils/convertor";
import { $ } from "@/utils/Dom";

class Select {
  attribute: Attribute;
  options: string[];

  constructor(attribute: Attribute, options: string[]) {
    this.attribute = attribute;
    this.options = options;
  }

  addEvent(setSelectedValue: SetSelectedValue, rerenderList: () => void) {
    const selectEl = $(`#${this.attribute.id}`);
    selectEl?.addEventListener("change", (e) => {
      const selectedOption = (e.target as HTMLSelectElement).value as
        | Category
        | Sort;
      setSelectedValue(this.attribute.id, selectedOption);
      rerenderList();
    });
  }

  template() {
    return ` 
    <select ${convertHtmlAttribute(this.attribute)}>
    ${this.OptionTemplate()}
    </select>`;
  }

  OptionTemplate() {
    return this.options
      .map((option: string) => `<option value='${option}'> ${option} </option>`)
      .join("");
  }
}

export default Select;
