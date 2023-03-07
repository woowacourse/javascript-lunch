import { Restaurant } from '../types/Types';
import { compareString } from '../utils/common';
import { VALUE } from '../constants/constants';

class Restaurants {
  #restaurantsList: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    this.#restaurantsList = restaurants.map(restaurant => this.getConvertedUndefinedToEmptyString(restaurant));
  }

  get restaurantsList(): Restaurant[] {
    return this.#restaurantsList;
  }

  add(restaurant: Restaurant): Restaurant[] {
    restaurant.favorites = false;
    this.#restaurantsList.push(this.getConvertedUndefinedToEmptyString(restaurant));

    return this.#restaurantsList;
  }

  getConvertedUndefinedToEmptyString(restaurant: Restaurant): Restaurant {
    if (restaurant.description === 'undefined') restaurant.description = '';
    if (restaurant.link === 'undefined') restaurant.link = '';

    return restaurant;
  }

  getSelectedRestaurantsList(category: string, sortType: string) {
    return this.sortByType(sortType, this.filterByCategory(category, this.#restaurantsList));
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
