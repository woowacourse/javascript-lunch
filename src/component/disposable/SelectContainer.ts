import {
  CATEGORY,
  Constants,
  OptionValue,
  SORTING,
} from "@/constant/Restaurant";
import { SetSelectedValue } from "@/type/type";
import Select from "@/component/reusable/Select";

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
      [OptionValue.TOTAL, ...CATEGORY]
    );

    this.sortingSelect = new Select(
      {
        required: false,
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

  addEvent(setSelectedValue: SetSelectedValue) {
    this.categorySelect.addEvent(Constants.CATEGORY_FILTER, setSelectedValue);
    this.sortingSelect.addEvent(Constants.SORTING_FILTER, setSelectedValue);
  }
}

export default new SelectContainer();
