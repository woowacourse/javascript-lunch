import {
  CATEGORY,
  CategoryFilterAttribute,
  OptionValue,
  SORTING,
  SortingFilterAttribute,
} from "@/constant/Restaurant";
import { Rerender, SetSelectedValue } from "@/type/type";
import Select from "@/component/common/Select";
import { $ } from "@/utils/Dom";

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

  addEvent(setSelectedValue: SetSelectedValue, rerenderList: Rerender) {
    this.categorySelect.addEvent(setSelectedValue, rerenderList);
    this.sortingSelect.addEvent(setSelectedValue, rerenderList);
  }

  hide() {
    $(".restaurant-filter-container")?.classList.add("hide");
  }

  show() {
    $(".restaurant-filter-container")?.classList.remove("hide");
  }
}

export default new SelectContainer();
