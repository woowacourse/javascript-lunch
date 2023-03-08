import { $ } from '../utils/domSelectors';
import { RestaurantItems } from '../components/RestaurantItems';
import { Restaurant } from '../types/types';

class MainView {
  private addButton = $<HTMLButtonElement>('.gnb__button');
  private modal = $<HTMLDialogElement>('.modal');
  private categoryFilter = $<HTMLSelectElement>('#category-filter');
  private sortingFilter = $<HTMLSelectElement>('#sorting-filter');

  constructor() {
    this.addRestaurantAddButtonClickEvent();
  }

  addRestaurantAddButtonClickEvent() {
    this.addButton.addEventListener('click', () => {
      this.modal.showModal();
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

  renderRestaurantList(restaurants: Restaurant[]) {
    const restaurantList = $<HTMLUListElement>('.restaurant-list');
    const restaurantItems = RestaurantItems(restaurants);

    restaurantList.innerHTML = '';
    restaurantList.insertAdjacentHTML('beforeend', restaurantItems);
  }
}

export default MainView;
