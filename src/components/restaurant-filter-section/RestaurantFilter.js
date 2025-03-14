import {
  EVENT_TYPES,
  NAV_BAR_KEYS,
  SORT_OPTIONS,
  CATEGORY,
} from "../../constants/constants.js";
import "./restaurantFilter.css";

export default class RestaurantFilter {
  constructor({ onFilterChange }) {
    this.onFilterChange = onFilterChange;

    this.currentFilterType = {
      categoryFilterType: CATEGORY[0],
      sortFilterType: Object.keys(SORT_OPTIONS)[0],
    };
  }

  render() {
    this.$filterContainer = document.createElement("section");
    this.$filterContainer.className = "restaurant-filter-container";

    this.#renderFilterCategory();
    this.#renderFilterSort();

    return this.$filterContainer;
  }

  #renderFilterCategory() {
    const $filterCategory = document.createElement("select");
    $filterCategory.className = "restaurant-filter";
    $filterCategory.id = "category-filter";
    $filterCategory.setAttribute("name", "category-filter");

    this.$filterContainer.append($filterCategory);

    CATEGORY.forEach((optionType) => {
      const $option = document.createElement("option");

      $option.value = optionType;
      $option.textContent = optionType;

      $filterCategory.append($option);
    });

    $filterCategory.addEventListener(EVENT_TYPES.change, (e) => {
      const categoryFilterType = e.target.value;

      this.currentFilterType = {
        ...this.currentFilterType,
        categoryFilterType,
      };

      this.onFilterChange(this.currentFilterType);
    });
  }

  #renderFilterSort() {
    const $filterSort = document.createElement("select");
    $filterSort.className = "restaurant-filter";
    $filterSort.id = "sorting-filter";
    $filterSort.setAttribute("name", "sorting-filter");

    this.$filterContainer.append($filterSort);

    Object.keys(SORT_OPTIONS).forEach((optionType) => {
      const $option = document.createElement("option");

      $option.value = optionType;
      $option.textContent = SORT_OPTIONS[optionType];

      $filterSort.append($option);
    });

    $filterSort.addEventListener(EVENT_TYPES.change, (e) => {
      const sortFilterType = e.target.value;

      this.currentFilterType = {
        ...this.currentFilterType,
        sortFilterType,
      };

      this.onFilterChange(this.currentFilterType);
    });
  }

  getCurrentFilterType() {
    return this.currentFilterType;
  }

  toggleFilterVisibility({ tabType }) {
    if (tabType === NAV_BAR_KEYS.favorite) {
      this.$filterContainer.classList.add("restaurant-filter--open");
    } else {
      this.$filterContainer.classList.remove("restaurant-filter--open");
    }
  }
}
