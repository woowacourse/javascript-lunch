import { ERROR_MESSAGE } from '@/constants/Message';
import type { AllAndCategory, IRestaurant, SortCriteria } from '../../types/Restaurant';
import Restaurant from './Restaurant';

class RestaurantCollection {
  restaurantList: Restaurant[];

  constructor(restaurants: IRestaurant[]) {
    this.restaurantList = restaurants.map((restaurant: IRestaurant) => new Restaurant(restaurant));
  }

  getRestaurantById(id: number) {
    return this.restaurantList.filter((restaurant) => restaurant.id === id);
  }

  get() {
    return [...this.restaurantList].map((restaurant) => restaurant.get());
  }

  set(restaurantList: IRestaurant[]) {
    this.restaurantList = restaurantList.map(
      (restaurant: IRestaurant) => new Restaurant(restaurant),
    );
  }

  filterDefault() {
    this.filterByCategory('전체');
    this.sortList('이름순');
    return this.restaurantList;
  }

  filterByCategoryAndSort(category: AllAndCategory, sortCriteria: SortCriteria) {
    this.filterByCategory(category);
    this.sortList(sortCriteria);
    return this.restaurantList;
  }

  filterByCategory(category: AllAndCategory) {
    if (category === '전체') return;
    this.restaurantList = [...this.restaurantList].filter(
      (restaurant) => restaurant.get().category === category,
    );
  }

  sortList(sortCriteria: SortCriteria) {
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

  addRestaurant(newRestaurant: IRestaurant) {
    const isDuplicated = this.restaurantList.some((restaurant) => {
      return restaurant.name === newRestaurant.name;
    });
    if (isDuplicated) throw new Error(ERROR_MESSAGE.DUPLICATE_NAME);
    this.restaurantList = [...this.restaurantList, new Restaurant(newRestaurant)];
  }

  deleteRestaurant(id: number) {
    const newRestaurantList = [...this.restaurantList].filter((restaurant) => {
      return restaurant.id !== id;
    });
    this.restaurantList = newRestaurantList;
  }
}

export default RestaurantCollection;
