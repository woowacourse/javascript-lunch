import { FOOD_CATEGORY_FILTER, SORTED_OPTION } from "../../settings/settings";
import type { CategoryFilter, SortedOption } from "../../types/type";
import { getElement } from "../../utils/dom";
import createFilter from "../filter/filter";
import {
  setCategoryFilter,
  setSortedOption,
} from "../restaurant/list/restaurantList";

export function handleCategoryFilterSelect(categoryFilter: CategoryFilter) {
  const select = document.getElementById(
    "category-filter"
  ) as HTMLSelectElement;
  select.value = categoryFilter;
  setCategoryFilter(categoryFilter);
}

function handleCategoryFilterChange(e: Event) {
  const target = e.target as HTMLSelectElement;
  setCategoryFilter(target.value as CategoryFilter);
}

function handleSortedFilterChange(e: Event) {
  const target = e.target as HTMLSelectElement;
  setSortedOption(target.value as SortedOption);
}

function filterBoxRenderer() {
  function createFilterBox() {
    const categoryFilter = createFilter({
      id: "category-filter",
      onchange: handleCategoryFilterChange,
      dropdownList: FOOD_CATEGORY_FILTER,
    });

    const sortedFilter = createFilter({
      id: "sorting-filter",
      onchange: handleSortedFilterChange,
      dropdownList: SORTED_OPTION,
    });

    return createElementsFragment([categoryFilter, sortedFilter]);
  }

  function renderFilterBox() {
    const restaurantFilterContainer = getElement(
      ".restaurant-filter-container"
    );

    restaurantFilterContainer?.appendChild(createFilterBox());
  }

  function removeFilterBox() {
    const restaurantFilterContainer = getElement(
      ".restaurant-filter-container"
    );

    restaurantFilterContainer?.replaceChildren();
  }

  return { renderFilterBox, removeFilterBox };
}

export const { renderFilterBox, removeFilterBox } = filterBoxRenderer();
