import { Restaurant } from '../types/Types';
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

  add(restaurant: Restaurant): void {
    this.#restaurants.push(this.optionInfoCovertToEmptyString(restaurant));
  }

  optionInfoCovertToEmptyString(restaurant: Restaurant): Restaurant {
    if (restaurant.description === 'undefined') restaurant.description = '';
    if (restaurant.link === 'undefined') restaurant.link = '';

    return restaurant;
  }

  getRestaurant(category: string, sortType: string) {
    return this.sortByType(sortType, this.filterByCategory(category, this.#restaurants));
  }

  filterByCategory(category: string, restaurants: Restaurant[]): Restaurant[] {
    if (category === VALUE.catgory.all) return restaurants;

    return restaurants.filter(restaurant => restaurant.category === category);
  }

  sortByType(sortType: string, restaurants: Restaurant[]): Restaurant[] {
    if (sortType === VALUE.sortType.nameOrder) {
      return [...restaurants].sort((a, b) => compareString(a.name, b.name));
    }

    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }
}

export default Restaurants;
