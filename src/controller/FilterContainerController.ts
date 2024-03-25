import {
  CATEGORY_WITH_ENTIRE,
  SORT_STANDARD,
} from "../constants/selectOptions";

import SelectBox from "../view/components/SelectBox/SelectBox";

class FilterContainerController {
  element = this.#createFilterContainer();

  #categoryFilter = new SelectBox({
    options: CATEGORY_WITH_ENTIRE,
  });

  #sortStandardFilter = new SelectBox({
    options: SORT_STANDARD,
  });

  constructor() {
    this.element.append(
      this.#categoryFilter.element,
      this.#sortStandardFilter.element
    );
  }

  reveal() {
    this.element.classList.remove("display-none");
  }

  hide() {
    this.element.classList.add("display-none");
  }

  getValue() {
    return {
      category: this.#categoryFilter.getValue(),
      sortStandard: this.#sortStandardFilter.getValue(),
    };
  }

  setOnChange(eventListener: (e?: Event) => void) {
    this.#categoryFilter.element.onchange = eventListener;
    this.#sortStandardFilter.element.onchange = eventListener;
  }

  #createFilterContainer() {
    const filterContainer = document.createElement("section");
    filterContainer.classList.add("restaurant-filter-container");

    return filterContainer;
  }
}

export default FilterContainerController;
