import { Restaurant, SortTypeValue, CategoryValue } from '../types/Types';
import { compareString } from '../utils/common';
import { VALUE } from '../constants/constants';

class Restaurants {
  #restaurants: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    this.#restaurants = restaurants;
  }

  get restaurants(): Restaurant[] {
    return this.#restaurants;
  }

  add({ description = '', link = '', ...restaurantInfo }: Restaurant): void {
    this.#restaurants.push({ description, link, ...restaurantInfo });
  }

  getRestaurant(category: CategoryValue, sortType: SortTypeValue) {
    return Restaurants.sortByType(sortType, Restaurants.filterByCategory(category, this.#restaurants));
  }

  static filterByCategory(category: CategoryValue, restaurants: Restaurant[]): Restaurant[] {
    if (category === VALUE.catgory.all) return restaurants;

    return restaurants.filter(restaurant => restaurant.category === category);
  }

  static sortByType(sortType: SortTypeValue, restaurants: Restaurant[]): Restaurant[] {
    if (sortType === VALUE.sortType.nameOrder) {
      return [...restaurants].sort((a, b) => compareString(a.name, b.name));
    }

    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }
}

export default Restaurants;
