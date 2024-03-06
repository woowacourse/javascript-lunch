import { FilteringCategory, SortingProperty, Restaurant } from '../interface/RestaurantInterfaces';
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
    OutputView.showRestaurantList(this.#restaurantList);
  }

  getRecentData(): Restaurant[] {
    const storedData = localStorage.getItem('restaurantList');
    return storedData ? JSON.parse(storedData) : [];
  }
}

export default RestaurantController;
