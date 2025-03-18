import {
  categoryFilterValue,
  sortingValue,
} from "../../../constants/optionValue.js";
import FilterDropdown from "./FilterDropdown.js";

export const createCategoryFilter = (
  onChange: (value: string) => void,
  selectedCategory: string,
) => {
  return new FilterDropdown(
    document.querySelector(".category-filter-container"),
    {
      id: "category",
      optionValue: categoryFilterValue,
      selectedValue: selectedCategory,
      onChange,
    },
  );
};

export const createSortingFilter = (
  onChange: (value: string) => void,
  sortOption: string,
) => {
  return new FilterDropdown(
    document.querySelector(".sorting-filter-container"),
    {
      id: "sorting",
      optionValue: sortingValue,
      selectedValue: sortOption,
      onChange,
    },
  );
};
