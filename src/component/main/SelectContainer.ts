import { OptionValue } from "@/constant/Restaurant";
import Select from "@/component/common/Select";
import { $ } from "@/utils/Dom";
import {
  CATEGORY,
  CategoryFilterAttribute,
  SORTING,
  SortingFilterAttribute,
} from "@/data/componentData";

class SelectContainer {
  categorySelect;
  sortingSelect;

  constructor() {
    this.categorySelect = new Select(CategoryFilterAttribute, [
      OptionValue.TOTAL,
      ...CATEGORY,
    ]);

    this.sortingSelect = new Select(SortingFilterAttribute, SORTING);
  }

  template() {
    return `
    <section class="restaurant-filter-container">
          ${this.categorySelect.template()}
          ${this.sortingSelect.template()}
    </section>
    `;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  addEvent() {
    this.categorySelect.addEvent();
    this.sortingSelect.addEvent();
  }

  hide() {
    $(".restaurant-filter-container")?.classList.add("hide");
  }

  show() {
    $(".restaurant-filter-container")?.classList.remove("hide");
  }
}

export default new SelectContainer();
