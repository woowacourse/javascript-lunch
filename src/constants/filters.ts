import $filter from "../components/common/filter.js";
import {
  categoryFilterOptions,
  sortFilterOptions,
} from "../data/filterOptions.js";
import { deepFreeze } from "../utils/deepFreeze.js";

type Filter = {
  attribute?: {
    id: string;
    name: string;
    class?: string;
  };
  options: Record<string, string>;
};

export type FilterGroup = {
  CATEGORY: Filter;
  SORT: Filter;
  create: (info: Filter) => HTMLSelectElement;
};

export const FILTERS: FilterGroup = deepFreeze({
  CATEGORY: {
    options: categoryFilterOptions,
    attribute: {
      name: "category",
      id: "category-filter",
      class: "restaurant-filter",
    },
  },
  SORT: {
    options: sortFilterOptions,
    attribute: {
      name: "sorting",
      id: "sorting-filter",
      class: "restaurant-filter",
    },
  },
  create: (info: Filter) => {
    if ("options" in info) return $filter(info);
    throw new Error("filter에 옵션 값이 없습니다.");
  },
} as const);
