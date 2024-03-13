import type { AllAndCategory, IRestaurant, SortCriteria } from '../../types/Restaurant';
import Restaurant from './Restaurant';

class RestaurantCollection {
  restaurantList: Restaurant[];

  constructor(restaurants: IRestaurant[]) {
    this.restaurantList = restaurants.map((restaurant: IRestaurant) => new Restaurant(restaurant));
  }

  get() {
    return [...this.restaurantList].map((restaurant) => restaurant.get());
  }

  set(restaurantList: IRestaurant[]) {
    this.restaurantList = restaurantList.map(
      (restaurant: IRestaurant) => new Restaurant(restaurant),
    );
  }

  filterByCategoryAndSort(category: AllAndCategory, sortCriteria: SortCriteria) {
    this.filterByCategory(category);
    this.sort(sortCriteria);
    return this.restaurantList;
  }

  filterByCategory(category: AllAndCategory) {
    if (category === '전체') return this.restaurantList.map((restaurant) => restaurant.get());
    this.restaurantList = [...this.restaurantList].filter(
      (restaurant) => restaurant.get().category === category,
    );
  }

  sort(sortCriteria: SortCriteria) {
    if (sortCriteria === '이름순') return this.sortByName();
    return this.sortByDistance();
  }

  sortByName() {
    this.restaurantList = [...this.restaurantList].sort((a, b) =>
      a.get().name.localeCompare(b.get().name),
    );
  }

  sortByDistance() {
    this.restaurantList = [...this.restaurantList].sort(
      (a, b) => a.get().distance - b.get().distance,
    );
  }

  filterFavorites() {
    this.restaurantList = [...this.restaurantList].filter(
      (restaurant) => restaurant.get().isFavorite === true,
    );
  }

  addRestaurant(restaurantArg: IRestaurant) {
    const restaurant = new Restaurant(restaurantArg);
    this.restaurantList.push(restaurant);
  }
}

export default RestaurantCollection;
