import { updateListViewType } from "../../types/common.ts";
import CategorySortFilterEventHandler from "../event/filterEventHandlers.ts";
import createCategorySortFilterView from "../view/createCategorySortFilterView.js";

class CategorySortFilterController {
  updateListView;
  categorySortFilterContainerElement;
  categoryFilterElement;
  sortingFilterElement;

  constructor(updateListView: updateListViewType) {
    this.updateListView = updateListView;
    this.categorySortFilterContainerElement = createCategorySortFilterView();

    this.categoryFilterElement = this.categorySortFilterContainerElement.querySelector(
      "#category-filter",
    ) as HTMLSelectElement;
    this.sortingFilterElement = this.categorySortFilterContainerElement.querySelector(
      "#sorting-filter",
    ) as HTMLSelectElement;

    CategorySortFilterEventHandler({
      categoryFilterElement: this.categoryFilterElement,
      sortingFilterElement: this.sortingFilterElement,
      updateListView: this.updateListView.bind(this),
    });
  }

  getContainerElement(): HTMLElement {
    return this.categorySortFilterContainerElement;
  }

  updateCategorySortListView(): void {
    this.updateListView(this.categoryFilterElement.value, this.sortingFilterElement.value);
  }
}

export default CategorySortFilterController;
