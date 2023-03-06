import { Restaurant, SortTypeFilter, CategoryFilter } from '../types/Types';
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

  getRestaurant(category: CategoryFilter, sortType: SortTypeFilter) {
    return Restaurants.sortByType(sortType, Restaurants.filterByCategory(category, this.#restaurants));
  }

  static filterByCategory(category: CategoryFilter, restaurants: Restaurant[]): Restaurant[] {
    if (category.value === VALUE.catgory.all) return restaurants;

    return restaurants.filter(restaurant => restaurant.category === category.value);
  }

  static sortByType(sortType: SortTypeFilter, restaurants: Restaurant[]): Restaurant[] {
    if (sortType.value === VALUE.sortType.nameOrder) {
      return [...restaurants].sort((a, b) => compareString(a.name, b.name));
    }

    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }
}

export default Restaurants;
