import { Category } from '../types/type';
import { IRestaurant, Restaurant } from './Restaurant';

export default class RestaurantService {
  #restaurants: Restaurant[] = [];

  getRestaurantsInfo(restaurant = this.#restaurants) {
    return restaurant.map((restaurant) => restaurant.getRestaurantInfo());
  }

  filterByCategory(category: Category) {
    const filteredByCategory = this.#restaurants.filter((restaurant) =>
      restaurant.isSameCategory(category)
    );

    return this.getRestaurantsInfo(filteredByCategory);
  }

  sortByName() {
    const nameSortedRestaurants = [...this.#restaurants].sort((a, b) => {
      if (a.compareName(b) === 0) return a.compareDistance(b);

      return a.compareName(b);
    });

    return this.getRestaurantsInfo(nameSortedRestaurants);
  }

  sortByDistance() {
    const distanceSortedRestaurants = [...this.#restaurants].sort((a, b) => {
      if (a.compareDistance(b) === 0) return a.compareName(b);

      return a.compareDistance(b);
    });

    return this.getRestaurantsInfo(distanceSortedRestaurants);
  }

  addRestaurant(restaurant: IRestaurant) {
    this.#restaurants = [
      ...this.#restaurants,
      new Restaurant({ ...restaurant }),
    ];
  }
}
