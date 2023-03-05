import { Restaurant } from '../types/types';
import { $ } from '../utils/domSelectors';
import createRestaurantList from '../components/RestaurantList';

class MainView {
  private addButton = $('.gnb__button') as HTMLButtonElement;
  private modal = $('.modal') as HTMLDialogElement;
  private categoryFilter = $('#category-filter') as HTMLSelectElement;
  private sortingFilter = $('#sorting-filter') as HTMLSelectElement;
  private restaurantList = $('.restaurant-list') as HTMLUListElement;

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
      const target = event.target as HTMLSelectElement;
      onChangeCategoryFilter(target.value);
    });
  }

  addSortingChangeEventHandler(onChangeSortingFilter: CallableFunction) {
    this.sortingFilter.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      onChangeSortingFilter(target.value);
    });
  }

  renderRestaurantList(restaurants: Restaurant[]) {
    const restaurantItems = createRestaurantList(restaurants);
    this.restaurantList.innerHTML = '';
    this.restaurantList.insertAdjacentHTML('beforeend', restaurantItems.join(''));
  }
}

export default MainView;
