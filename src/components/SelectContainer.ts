import { SelectFilterType } from "./../types/type";
import { OptionValue, RestaurantSelect } from "../utils/Constants";
import { Constants } from "../utils/Constants";
import { RerenderListType } from "../types/type";
import Select from "../components/common/Select";
import { $ } from "../utils/Dom";

class SelectContainer {
  categorySelect;
  sortingSelect;

  constructor() {
    this.categorySelect = new Select(
      {
        required: false,
        name: "category",
        id: "category-filter",
        className: "restaurant-filter",
      },
      [OptionValue.TOTAL, ...RestaurantSelect.CATEGORY]
    );

    this.sortingSelect = new Select(
      {
        required: false,
        name: "sorting",
        id: "sorting-filter",
        className: "restaurant-filter",
      },
      RestaurantSelect.SORTING
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

  initialize(target: Element, rerenderList: RerenderListType) {
    this.render(target);
    this.categorySelect.addEvent(
      <SelectFilterType>Constants.CATEGORY_FILTER,
      rerenderList.bind(this)
    );
    this.sortingSelect.addEvent(
      <SelectFilterType>Constants.SORTING_FILTER,
      rerenderList.bind(this)
    );
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  hide() {
    $(".restaurant-filter-container")?.classList.add("hide");
  }

  show() {
    $(".restaurant-filter-container")?.classList.remove("hide");
  }
}

export default new SelectContainer();
