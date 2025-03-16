import { updateListViewType } from "../../types/common.js";
import CategorySortFilterEventHandler from "../event/filterEventHandlers.js";
import createCategorySortFilterView from "../view/createCategorySortFilterView.js";

function CategorySortFilterController(updateListView: updateListViewType) {
  const categorySortFilterContainerElement = createCategorySortFilterView();

  const categoryFilterElement = categorySortFilterContainerElement.querySelector(
    "#category-filter",
  ) as HTMLSelectElement;
  const sortingFilterElement = categorySortFilterContainerElement.querySelector("#sorting-filter") as HTMLSelectElement;

  CategorySortFilterEventHandler({ categoryFilterElement, sortingFilterElement, updateListView });

  function updateCategorySortListView() {
    updateListView(categoryFilterElement.value, sortingFilterElement.value);
  }

  return { categorySortFilterContainerElement, updateCategorySortListView };
}

export default CategorySortFilterController;
