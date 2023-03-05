import { Restaurant } from '../types/types';
import { SELECT_OPTIONS } from '../constants/constants';
import { $ } from '../utils/domSelectors';
import createRestaurantList from '../components/RestaurantList';
import createSelectOptions from '../components/SelectOptions';

class MainView {
  private addButton = $('.gnb__button') as HTMLButtonElement;
  private modal = $('.modal') as HTMLDialogElement;
  private categoryFilter = $('#category-filter') as HTMLSelectElement;
  private sortingFilter = $('#sorting-filter') as HTMLSelectElement;
  private restaurantList = $('.restaurant-list') as HTMLUListElement;

  constructor() {
    this.renderCategoryFilterSelectOptions();
    this.renderSortingFilterSelectOptions();

    this.addRestaurantAddButtonClickEvent();
  }

  renderRestaurantList(restaurants: Restaurant[]) {
    const restaurantItems = createRestaurantList(restaurants);
    this.restaurantList.innerHTML = '';
    this.restaurantList.insertAdjacentHTML('beforeend', restaurantItems);
  }

  renderCategoryFilterSelectOptions() {
    const options = createSelectOptions(SELECT_OPTIONS.CATEGORY_FILTER);
    this.categoryFilter.insertAdjacentHTML('beforeend', options);
  }

  renderSortingFilterSelectOptions() {
    const options = createSelectOptions(SELECT_OPTIONS.SORTING_FILTER);
    this.sortingFilter.insertAdjacentHTML('beforeend', options);
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
}

export default MainView;
