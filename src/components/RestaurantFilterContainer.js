import {
  CATEGORY_FILTER_OPTIONS,
  SORTING_OPTIONS,
} from "../constants/options.js";
import CustomDropdown from "../shared/CustomDropdown.js";

export default function RestaurantFilterContainer(container) {
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

  container.innerHTML += `

      <div class="filter-dropdown">
        ${categoryDropdown}
      </div>
      <div class="filter-dropdown">
        ${sortingDropdown}
      </div>
  `;
}
