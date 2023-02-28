import { Restaurant } from '../types/Types';
import { compareString } from '../utils/common';

class Restaurants {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
  }

  add(restaurant: Restaurant): void {
    this.#restaurants.push(this.optionInfoCovertToEmptyString(restaurant));
  }

  optionInfoCovertToEmptyString(restaurant: Restaurant): Restaurant {
    if (restaurant.discription === 'undefined') restaurant.discription = '';
    if (restaurant.link === 'undefined') restaurant.link = '';

    return restaurant;
  }

  getRestaurant(category: string, sortType: string) {
    return this.sortByType(sortType, this.filterByCategory(category, this.#restaurants));
  }

  filterByCategory(category: string, restaurants: Restaurant[]): Restaurant[] {
    if (category === '전체') return restaurants;

    return restaurants.filter(restaurant => restaurant.category === category);
  }

  sortByType(sortType: string, restaurants: Restaurant[]): Restaurant[] {
    if (sortType === '이름순') {
      return restaurants.sort((a, b) => compareString(a.name, b.name));
    }

    return restaurants.sort((a, b) => a.distance - b.distance);
  }
}

export default Restaurants;
