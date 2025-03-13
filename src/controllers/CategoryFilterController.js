import CategoryFilterWrapper from "../components/CategoryFilterWrapper.js";
import List from "../components/List.js";
import { SELECT_CATEGORY, SELECT_SORTING } from "../constants/constant.js";

const CATEGORY_FILTER_DATA = [
  { name: "category", id: "category-filter", options: SELECT_CATEGORY, className: "restaurant-filter" },
  { name: "sorting", id: "sorting-filter", options: SELECT_SORTING, className: "restaurant-filter" },
];

function CategoryFilterController(allListContainerElement, updateList) {
  const categoryFilterContainer = CategoryFilterWrapper(CATEGORY_FILTER_DATA);
  allListContainerElement.prepend(categoryFilterContainer);

  const categoryFilterElement = categoryFilterContainer.querySelector("#category-filter");
  const sortingFilterElement = categoryFilterContainer.querySelector("#sorting-filter");

  categoryFilterElement.addEventListener("change", (event) => {
    const category = event.target.value;
    updateList(category, sortingFilterElement.value);
  });
  sortingFilterElement.addEventListener("change", (event) => {
    const sortOption = event.target.value;
    updateList(categoryFilterElement.value, sortOption);
  });

  return {
    categoryFilterElement,
    sortingFilterElement,
  };
}

export default CategoryFilterController;
