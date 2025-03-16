import CategorySortFilterEventHandler from "../event/filterEventHandlers.js";
import createCategorySortFilterView from "../view/createCategorySortFilterView.js";

function CategorySortFilterController(updateListView) {
  const categorySortFilterContainerElement = createCategorySortFilterView();

  const categoryFilterElement = categorySortFilterContainerElement.querySelector("#category-filter");
  const sortingFilterElement = categorySortFilterContainerElement.querySelector("#sorting-filter");

  CategorySortFilterEventHandler(categoryFilterElement, sortingFilterElement, updateListView);

  function updateCategorySortListView() {
    updateListView(categoryFilterElement.value, sortingFilterElement.value);
  }

  return { categorySortFilterContainerElement, updateCategorySortListView };
}

export default CategorySortFilterController;
