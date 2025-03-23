import {
  CATEGORY_FILTER_OPTIONS,
  SORTING_OPTIONS,
} from "../constants/options.js";
import CustomDropdown from "../shared/CustomDropdown.js";
import {
  handleCategoryFilter,
  handleSortingFilter,
} from "../handlers/filterHandler.js";

export default function RestaurantFilterContainer() {
  const categoryDropdown = CustomDropdown({
    label: "",
    name: "category",
    id: "category-filter",
    options: CATEGORY_FILTER_OPTIONS.map((option) => ({
      value: option.value,
      text: option.label,
    })),
    required: false,
    selectFirst: true,
    type: "filter", // 필터용임을 명시
  });

  const sortingDropdown = CustomDropdown({
    label: "",
    name: "sorting",
    id: "sorting-filter",
    options: SORTING_OPTIONS.map((option) => ({
      value: option.value,
      text: option.label,
    })),
    required: false,
    selectFirst: true,
    type: "filter",
  });

  // HTML 문자열 생성
  const filterHTML = `
    <div class="filter-dropdown">
      ${categoryDropdown}
    </div>
    <div class="filter-dropdown">
      ${sortingDropdown}
    </div>
  `;

  function render(container) {
    container.insertAdjacentHTML("beforeend", filterHTML);
    setupFilterEventListeners();
    return container.querySelector(".filter-dropdown").parentElement;
  }

  function setupFilterEventListeners() {
    const $categoryFilter = document.getElementById("category-filter");
    const $sortingFilter = document.getElementById("sorting-filter");

    if ($categoryFilter) {
      $categoryFilter.addEventListener("change", handleCategoryFilter);
    }

    if ($sortingFilter) {
      $sortingFilter.addEventListener("change", handleSortingFilter);
    }
  }

  return {
    render,
  };
}
