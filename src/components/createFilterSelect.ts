import { categoryFilterValue, sortingValue } from "../constants/optionValue.js";
import FilterDropdown from "./Dropdown/FilterDropdown.js";
const createFilterSelect = (filter: string) => {
  if (filter === "category") {
    return FilterDropdown({
      id: "category-filter",
      optionValue: categoryFilterValue,
    });
  }

  if (filter === "sorting") {
    return FilterDropdown({
      id: "sorting-filter",
      optionValue: sortingValue,
    });
  }
};

export default createFilterSelect;
