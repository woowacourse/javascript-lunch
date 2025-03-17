import SELECT_OPTION from "../../constants/selectOption.js";
import restaurantDataList from "../../domain/RestaurantList.ts";
import createElement from "../../util/createElement";
import Select from "../common/Select";

const SORTING_OPTIONS = ["이름순", "거리순"];

export default function RestaurantFilters() {
  const $filterContainer = createElement({
    tag: "section",
    classNames: ["restaurant-filter-container"],
  });

  const $categoryFilter = Select({
    name: "category",
    id: "category-filter",
    classNames: ["restaurant-filter"],
    options: ["전체", ...SELECT_OPTION.category],
    isDefaultOption: false,
  });

  const $sortingFilter = Select({
    name: "sorting",
    id: "sorting-filter",
    classNames: ["restaurant-filter"],
    options: SORTING_OPTIONS,
    values: ["name", "distance"],
    isDefaultOption: false,
  });

  $categoryFilter.addEventListener("change", handleCategoryChange);
  $sortingFilter.addEventListener("change", handleSortingChange);

  $filterContainer.append($categoryFilter, $sortingFilter);

  return $filterContainer;
}

function handleCategoryChange(event) {
  const selectedCategory = event.target.value;
  restaurantDataList.setCategory(selectedCategory);
  restaurantDataList.renderRestaurantList();
}

function handleSortingChange(event) {
  const selectedSorting = event.target.value;
  restaurantDataList.setSortedFlag(selectedSorting);
  restaurantDataList.renderRestaurantList();
}
