import { CATEGORY, SORT_OPTION_TEXTS } from "../../constants/constants.js";
import "./restaurantFilter.css";

export default class RestaurantFilter {
  render() {
    const $filterContainer = document.createElement("section");
    $filterContainer.className = "restaurant-filter-container";

    const $filterCategory = document.createElement("select");
    $filterCategory.className = "restaurant-filter";
    $filterCategory.id = "category-filter";
    $filterCategory.setAttribute("name", "category-filter");

    $filterContainer.append($filterCategory);

    const $totalOption = document.createElement("option");
    $totalOption.value = "전체";
    $totalOption.textContent = "전체";

    $filterCategory.append($totalOption);

    CATEGORY.forEach((option) => {
      const $option = document.createElement("option");

      $option.value = option;
      $option.textContent = option;

      $filterCategory.append($option);
    });

    const $filterSort = document.createElement("select");
    $filterSort.className = "restaurant-filter";
    $filterSort.id = "sorting-filter";
    $filterSort.setAttribute("name", "sorting-filter");

    $filterContainer.append($filterSort);

    Object.keys(SORT_OPTION_TEXTS).forEach((optionType) => {
      const $option = document.createElement("option");

      $option.value = optionType;
      $option.textContent = SORT_OPTION_TEXTS[optionType];

      $filterSort.append($option);
    });

    return $filterContainer;
  }
}
