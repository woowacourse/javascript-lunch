import {
  SelectAttribute,
  Category,
  Rerender,
  SetSelectedValue,
  Sort,
} from "@/type/type";
import { convertSelectAttribute } from "@/utils/convertor";
import { $ } from "@/utils/Dom";

class Select {
  attribute: SelectAttribute;
  options: string[];

  constructor(attribute: SelectAttribute, options: string[]) {
    this.attribute = attribute;
    this.options = options;
  }

  addEvent(setSelectedValue: SetSelectedValue, rerenderList: Rerender) {
    const selectEl = $(`#${this.attribute.id}`);
    selectEl?.addEventListener("change", (e) => {
      const selectedOption = <Category | Sort>(
        (e.target as HTMLSelectElement).value
      );
      setSelectedValue(this.attribute.id, selectedOption);
      rerenderList();
    });
  }

  template() {
    return ` 
    <select ${convertSelectAttribute(this.attribute)}>
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
