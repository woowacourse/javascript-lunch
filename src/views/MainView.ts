import { $ } from "../utils/domSelectors";

class MainView {
  private addButton = $(".gnb__button") as HTMLButtonElement;
  private modal = $(".modal") as HTMLDialogElement;
  private categoryFilter = $("#category-filter") as HTMLSelectElement;
  private sortingFilter = $("#sorting-filter") as HTMLSelectElement;

  constructor() {
    this.addRestaurantAddButtonClickEvent();
  }

  addRestaurantAddButtonClickEvent() {
    this.addButton.addEventListener("click", () => {
      this.modal.showModal();
    });
  }

  addCategoryChangeEventHandler(onChangeCategoryFilter: CallableFunction) {
    this.categoryFilter.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLSelectElement;
      onChangeCategoryFilter(target.value);
    });
  }

  addSortingChangeEventHandler(onChangeSortingFilter: CallableFunction) {
    this.sortingFilter.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLSelectElement;
      onChangeSortingFilter(target.value);
    });
  }
}

export default MainView;
