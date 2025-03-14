import { CATEGORY, SORT_OPTIONS } from "../../constants/constants.js";
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

    SORT_OPTIONS.forEach((option) => {
      const $option = document.createElement("option");

      // TODO: 상수 분리
      const valueTypes = {
        이름순: "name",
        거리순: "distance",
      };

      $option.value = valueTypes[option];
      $option.textContent = option;

      $filterSort.append($option);
    });

    return $filterContainer;
  }
}
