import { SELECT_CATEGORY, SELECT_SORTING } from "./constant.js";

const CATEGORY_SORT_FILTER_DATA = [
  { name: "category", id: "category-filter", options: SELECT_CATEGORY, className: "restaurant-filter" },
  { name: "sorting", id: "sorting-filter", options: SELECT_SORTING, className: "restaurant-filter" },
];
export default CATEGORY_SORT_FILTER_DATA;
