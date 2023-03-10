import { $ } from '../utils/domSelectors';

class MainView {
  private addButton = $<HTMLButtonElement>('.gnb__button');
  private addRestaurantModal = $<HTMLDialogElement>('#add-restaurant-modal');
  private categoryFilter = $<HTMLSelectElement>('#category-filter');
  private sortingFilter = $<HTMLSelectElement>('#sorting-filter');

  constructor() {
    this.addRestaurantAddButtonClickEvent();
  }

  addRestaurantAddButtonClickEvent() {
    this.addButton.addEventListener('click', () => {
      this.addRestaurantModal.showModal();
    });
  }

  addCategoryChangeEventHandler(onChangeCategoryFilter: CallableFunction) {
    this.categoryFilter.addEventListener('change', (event: Event) => {
      if (event.target instanceof HTMLSelectElement) onChangeCategoryFilter(event.target.value);
    });
  }

  addSortingChangeEventHandler(onChangeSortingFilter: CallableFunction) {
    this.sortingFilter.addEventListener('change', (event: Event) => {
      if (event.target instanceof HTMLSelectElement) onChangeSortingFilter(event.target.value);
    });
  }
}

export default MainView;
