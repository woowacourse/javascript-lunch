import { FILTER_OPTIONS } from "../../constants/rules.js";
import FilterBar from "./index.js";

class FilterManager {
  #selectedCategory = FILTER_OPTIONS.ALL_CATEGORY;
  #selectedSorting = FILTER_OPTIONS.SORTING[0];

  render($main, onFilterChange) {
    new FilterBar($main, {
      selectedCategory: this.#selectedCategory,
      selectedSorting: this.#selectedSorting,
      onCategoryChange: (selected) => {
        this.#selectedCategory = selected;
        onFilterChange();
      },
      onSortingChange: (selected) => {
        this.#selectedSorting = selected;
        onFilterChange();
      },
    });
  }

  getSelectedCategory() {
    return this.#selectedCategory;
  }

  getSelectedSorting() {
    return this.#selectedSorting;
  }
}

export default FilterManager;
