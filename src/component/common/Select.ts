import AppController from "@/AppDataController";
import { SelectAttribute, Category, Sort } from "@/type/type";
import { convertSelectAttribute } from "@/utils/convertor";
import { $ } from "@/utils/Dom";
import Render from "@/view/Render";

class Select {
  attribute: SelectAttribute;
  options: string[];

  constructor(attribute: SelectAttribute, options: string[]) {
    this.attribute = attribute;
    this.options = options;
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

  addEvent() {
    const selectEl = $(`#${this.attribute.id}`);
    selectEl?.addEventListener("change", (e) => {
      const selectedOption = <Category | Sort>(
        (e.target as HTMLSelectElement).value
      );

      AppController.setFilter(this.attribute.id, selectedOption);
      const restaurantList = AppController.getRestaurantList();
      Render.updateRestaurantList(restaurantList);
    });
  }
}

export default Select;
