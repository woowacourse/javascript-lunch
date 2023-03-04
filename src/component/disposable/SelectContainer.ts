import { OptionValue, RestaurantSelect } from "./../../constant/Constants";
import { Constants } from "../../constant/Constants";
import { RerenderListType } from "../../type/type";
import Select from "../reusable/Select";

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

  render(target: Element, rerenderList: RerenderListType) {
    target.insertAdjacentHTML("beforeend", this.template());

    this.categorySelect.addEvent(Constants.CATEGORY_FILTER, rerenderList);
    this.sortingSelect.addEvent(Constants.SORTING_FILTER, rerenderList);
  }
}

export default new SelectContainer();
