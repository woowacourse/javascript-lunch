import type { IRestaurantList, TRestaurantInstance, TCategory } from './types/restaurant';
import { STORAGE_KEY } from './constants/config';
import { ALL } from './constants/filter';

class RestaurantList {
  restaurants: IRestaurantList;

  constructor(restaurants: IRestaurantList) {
    const restaurantsInStorage = localStorage.getItem(STORAGE_KEY);
    if (restaurantsInStorage != null) this.restaurants = JSON.parse(restaurantsInStorage);
    else this.restaurants = restaurants;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.restaurants));
  }

  getSortedByName(): IRestaurantList {
    return [...this.restaurants].sort((a, b) => (a.information.name > b.information.name ? 1 : -1));
  }

  getSortedByDistance(): IRestaurantList {
    return [...this.restaurants].sort((a, b) => (a.information.distance > b.information.distance ? 1 : -1));
  }

  add(restaurant: TRestaurantInstance): void {
    this.restaurants.push(restaurant);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.restaurants));
  }

  filterByCategory(category: TCategory): IRestaurantList {
    if (category === ALL) return this.restaurants;
    return this.restaurants.filter(restaurant => restaurant.isMatchedCategory(category));
  }
}
export default RestaurantList;
