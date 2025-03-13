import FilterBar from "./index.js";

class FilterBarManager {
  #selectedCategory = "전체";
  #selectedSorting = "name";

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

export default FilterBarManager;
