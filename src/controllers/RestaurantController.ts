import { FilteringCategory, SortingProperty, Restaurant } from '../interface/RestaurantInterfaces';
import { $ } from '../utils/querySelector';
import OutputView from '../views/OutputView';

class RestaurantController {
  #restaurantList: Restaurant[];

  #category: FilteringCategory;

  #property: SortingProperty;

  constructor() {
    this.#restaurantList = this.getRecentData();
    this.#category = '전체';
    this.#property = 'name';
  }

  run(): void {
    OutputView.renderRestaurantList(this.#restaurantList);
    this.showAddRestaurantModal();
  }

  getRecentData(): Restaurant[] {
    const storedData = localStorage.getItem('restaurantList');
    return storedData ? JSON.parse(storedData) : [];
  }

  showAddRestaurantModal() {
    const addRestaurantButton = $('.gnb__button');
    if (!addRestaurantButton) return;
    addRestaurantButton.addEventListener('click', () => {
      OutputView.renderAddRestaurant();

      const form = $('form');
      if (!form) return;
      form.addEventListener('submit', () => OutputView.closeModal());
      form.addEventListener('reset', () => OutputView.closeModal());
    });
  }
}

export default RestaurantController;
