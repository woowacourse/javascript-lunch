import { updateListViewType } from "../../types/common.ts";
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

    this.registerEvents();
  }

  getContainerElement(): HTMLElement {
    return this.categorySortFilterContainerElement;
  }

  updateCategorySortListView(): void {
    this.updateListView(this.categoryFilterElement.value, this.sortingFilterElement.value);
  }

  render(container: HTMLElement) {
    container.appendChild(this.categorySortFilterContainerElement);
  }

  registerEvents() {
    this.categoryFilterElement.addEventListener("change", () => {
      this.updateListView(this.categoryFilterElement.value, this.sortingFilterElement.value);
    });

    this.sortingFilterElement.addEventListener("change", () => {
      this.updateListView(this.categoryFilterElement.value, this.sortingFilterElement.value);
    });
  }
}

export default CategorySortFilterController;
