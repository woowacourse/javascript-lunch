import CategorySortFilterWrapper from "../components/CategoryFilterWrapper.js";
import CATEGORY_SORT_FILTER_DATA from "../constants/categorySortFilterData.js";

function createCategorySortFilterView(containerElement) {
  const categorySortFilterContainer = CategorySortFilterWrapper(CATEGORY_SORT_FILTER_DATA);
  containerElement.prepend(categorySortFilterContainer);

  const categoryFilterElement = categorySortFilterContainer.querySelector("#category-filter");
  const sortingFilterElement = categorySortFilterContainer.querySelector("#sorting-filter");

  return { categoryFilterElement, sortingFilterElement };
}

export default createCategorySortFilterView;
