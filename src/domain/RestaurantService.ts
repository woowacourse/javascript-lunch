import { CategoryOptions } from '../types/type';
import { IRestaurant, Restaurant } from './Restaurant';

export default class RestaurantService {
  #restaurants: Restaurant[];

  constructor(restaurants: Restaurant[] = []) {
    this.#restaurants = restaurants;
  }

  getRestaurantsInfo() {
    return [...this.#restaurants];
  }

  filterByCategory(restaurants: Restaurant[], category: CategoryOptions) {
    if (category === '전체') {
      return this.getRestaurantsInfo();
    }

    const filteredByCategory = restaurants.filter((restaurant) =>
      restaurant.isSameCategory(category)
    );

    return filteredByCategory;
  }

  sortByName(restaurants: Restaurant[]) {
    const nameSortedRestaurants = [...restaurants].sort((a, b) => {
      if (a.compareName(b) === 0) return a.compareDistance(b);

      return a.compareName(b);
    });

    return nameSortedRestaurants;
  }

  sortByDistance(restaurants: Restaurant[]) {
    const distanceSortedRestaurants = [...restaurants].sort((a, b) => {
      if (a.compareDistance(b) === 0) return a.compareName(b);

      return a.compareDistance(b);
    });

    return distanceSortedRestaurants;
  }

  addRestaurant(restaurant: IRestaurant) {
    this.#restaurants = [
      ...this.#restaurants,
      new Restaurant({ ...restaurant }),
    ];
  }
}
