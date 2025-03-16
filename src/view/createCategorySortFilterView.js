import CategorySortFilterWrapper from "../components/CategoryFilterWrapper.js";
import CATEGORY_SORT_FILTER_DATA from "../constants/categorySortFilterData.js";

function createCategorySortFilterView(containerElement) {
  const categorySortFilterContainerElement = CategorySortFilterWrapper(CATEGORY_SORT_FILTER_DATA);

  return categorySortFilterContainerElement;
}

export default createCategorySortFilterView;
