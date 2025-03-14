import {
  CATEGORY,
  NAV_BAR_KEYS,
  SORT_OPTION_TEXTS,
} from "../../constants/constants.js";
import "./restaurantFilter.css";

const categoryFilter = ["전체", ...CATEGORY];

export default class RestaurantFilter {
  render() {
    this.$filterContainer = document.createElement("section");
    this.$filterContainer.className = "restaurant-filter-container";

    const $filterCategory = document.createElement("select");
    $filterCategory.className = "restaurant-filter";
    $filterCategory.id = "category-filter";
    $filterCategory.setAttribute("name", "category-filter");

    this.$filterContainer.append($filterCategory);

    categoryFilter.forEach((option) => {
      const $option = document.createElement("option");

      $option.value = option;
      $option.textContent = option;

      $filterCategory.append($option);
    });

    const $filterSort = document.createElement("select");
    $filterSort.className = "restaurant-filter";
    $filterSort.id = "sorting-filter";
    $filterSort.setAttribute("name", "sorting-filter");

    this.$filterContainer.append($filterSort);

    Object.keys(SORT_OPTION_TEXTS).forEach((optionType) => {
      const $option = document.createElement("option");

      $option.value = optionType;
      $option.textContent = SORT_OPTION_TEXTS[optionType];

      $filterSort.append($option);
    });

    return this.$filterContainer;
  }

  toggleFilterVisibility({ filterType }) {
    if (filterType === NAV_BAR_KEYS.favorite) {
      this.$filterContainer.classList.add("restaurant-filter--open");
    } else {
      this.$filterContainer.classList.remove("restaurant-filter--open");
    }
  }
}
