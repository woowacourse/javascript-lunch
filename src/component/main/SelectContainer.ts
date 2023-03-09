import { CATEGORY, OptionValue, SORTING } from "@/constant/Restaurant";
import { Rerender, SetSelectedValue } from "@/type/type";
import Select from "@/component/common/Select";
import { $ } from "@/utils/Dom";

class SelectContainer {
  categorySelect;
  sortingSelect;

  constructor() {
    this.categorySelect = new Select(
      {
        name: "category",
        id: "category-filter",
        className: "restaurant-filter",
      },
      [OptionValue.TOTAL, ...CATEGORY]
    );

    this.sortingSelect = new Select(
      {
        name: "sorting",
        id: "sorting-filter",
        className: "restaurant-filter",
      },
      SORTING
    );
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
