import { updateListViewType } from "../../types/common.ts";

interface CategorySortFilterEventHandlerType {
  categoryFilterElement: HTMLSelectElement;
  sortingFilterElement: HTMLSelectElement;
  updateListView: updateListViewType;
}

function CategorySortFilterEventHandler({
  categoryFilterElement,
  sortingFilterElement,
  updateListView,
}: CategorySortFilterEventHandlerType) {
  categoryFilterElement.addEventListener("change", () => {
    updateListView(categoryFilterElement.value, sortingFilterElement.value);
  });

  sortingFilterElement.addEventListener("change", () => {
    updateListView(categoryFilterElement.value, sortingFilterElement.value);
  });
}

export default CategorySortFilterEventHandler;
