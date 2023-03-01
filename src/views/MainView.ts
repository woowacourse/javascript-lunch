import { $ } from "../utils/domSelectors";

class MainView {
  private addButtton = $(".gnb__button");
  private modal = $(".modal");
  private categoryFilter = $("#category-filter") as HTMLSelectElement;
  private sortingFilter = $("#sorting-filter") as HTMLSelectElement;

  constructor() {
    this.addButtton?.addEventListener("click", (event) => {
      this.modal?.classList.add("modal--open");
    });
  }

  addCategoryChangeEventHandler(onChangeCategoryFilter: CallableFunction) {
    this.categoryFilter?.addEventListener("change", () => {
      onChangeCategoryFilter(this.categoryFilter?.value);
    });
  }

  addSortingChangeEventHandler(onChangeSortingFilter: CallableFunction) {
    this.sortingFilter?.addEventListener("change", () => {
      onChangeSortingFilter(this.sortingFilter?.value);
    });
  }
}

export default MainView;
