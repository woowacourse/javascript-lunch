import { CATEGORY_FILTER, SORT_FILTER } from "../constants/filter";

export type CategoryFilter = keyof typeof CATEGORY_FILTER;

export type SortFilter = keyof typeof SORT_FILTER;
