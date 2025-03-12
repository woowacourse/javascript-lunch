import $filter from "../components/common/filter.js";
import { categoryFilterOptions } from "../data/filterOptions.js";

type CategoryFilter = {
  attribute?: {
    id: string;
    name: string;
    class?: string;
  };
  options: Record<string, string>;
};

export type FilterGroup = {
  category: CategoryFilter;
  create: (info: CategoryFilter) => HTMLSelectElement;
};

export const FILTERS: FilterGroup = Object.freeze({
  category: {
    options: categoryFilterOptions,
    attribute: {
      name: "category",
      id: "category-filter",
      class: "restaurant-filter"
    },
  },
  create: (info: CategoryFilter) => {
    if ("options" in info) return $filter(info);
    throw new Error("filter에 옵션 값이 없습니다.");
  },
});

