import { Restaurant, SortTypeFilter, CategoryFilter } from '../types/Types';
import { compareString } from '../utils/common';
import { VALUE } from '../constants/constants';

class Restaurants {
  #restaurants: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    this.#restaurants = restaurants.map(restaurant => this.optionInfoCovertToEmptyString(restaurant));
  }

  get restaurants(): Restaurant[] {
    return this.#restaurants;
  }

  add(restaurant: Restaurant): void {
    this.#restaurants.push(this.optionInfoCovertToEmptyString(restaurant));
  }

  optionInfoCovertToEmptyString(restaurant: Restaurant): Restaurant {
    if (restaurant.description === 'undefined') restaurant.description = '';
    if (restaurant.link === 'undefined') restaurant.link = '';

    return restaurant;
  }

  getRestaurant(category: CategoryFilter, sortType: SortTypeFilter) {
    return this.sortByType(sortType, this.filterByCategory(category, this.#restaurants));
  }

  filterByCategory(category: CategoryFilter, restaurants: Restaurant[]): Restaurant[] {
    if (category.value === VALUE.catgory.all) return restaurants;

    return restaurants.filter(restaurant => restaurant.category === category.value);
  }

  sortByType(sortType: SortTypeFilter, restaurants: Restaurant[]): Restaurant[] {
    if (sortType.value === VALUE.sortType.nameOrder) {
      return [...restaurants].sort((a, b) => compareString(a.name, b.name));
    }

    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }
}

export default Restaurants;
