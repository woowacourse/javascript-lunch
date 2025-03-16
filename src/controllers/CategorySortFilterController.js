import CategorySortFilterEventHandler from "../event/filterEventHandlers.js";
import createCategorySortFilterView from "../view/createCategorySortFilterView.js";

function CategorySortFilterController(allListContainerElement, updateListView) {
  const { categoryFilterElement, sortingFilterElement } = createCategorySortFilterView(allListContainerElement);
  CategorySortFilterEventHandler(categoryFilterElement, sortingFilterElement, updateListView);

  function updateCategorySortListView() {
    updateListView(categoryFilterElement.value, sortingFilterElement.value);
  }

  return updateCategorySortListView;
}

export default CategorySortFilterController;
