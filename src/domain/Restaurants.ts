import { Restaurant, SortTypeValue, CategoryValue } from '../types/Types';
import { compareString } from '../utils/common';
import { SORT_BY_NAMEORDER, CATEGORY_ALL } from '../constants/constants';

class Restaurants {
  #restaurants: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    this.#restaurants = [];
    restaurants.forEach(restaurant => this.add(restaurant));
  }

  get restaurants(): Restaurant[] {
    return this.#restaurants;
  }

  makeUniqueID(): number {
    if (this.#restaurants.length === 0) return 0;
    return this.#restaurants[this.#restaurants.length - 1].ID + 1;
  }

  deleteByID(ID: number) {
    const index = this.#restaurants.findIndex(restaurant => restaurant.ID === ID);

    this.#restaurants.splice(index, 1);
  }

  swapFavoritesByID(ID: number) {
    const index = this.#restaurants.findIndex(restaurant => restaurant.ID === ID);

    this.#restaurants[index].favorites = !this.#restaurants[index].favorites;
  }

  add({ ID = this.makeUniqueID(), favorites = false, description = '', link = '', ...info }: Restaurant): void {
    this.#restaurants.push({ ID, favorites, description, link, ...info });
  }

  getFavoritesRestaurant() {
    return this.#restaurants.filter(restaurant => restaurant.favorites);
  }

  getRestaurant(category: CategoryValue, sortType: SortTypeValue) {
    return Restaurants.sortByType(sortType, Restaurants.filterByCategory(category, this.#restaurants));
  }

  static filterByCategory(category: CategoryValue, restaurants: Restaurant[]): Restaurant[] {
    if (category === CATEGORY_ALL) return restaurants;

    return restaurants.filter(restaurant => restaurant.category === category);
  }

  static sortByType(sortType: SortTypeValue, restaurants: Restaurant[]): Restaurant[] {
    if (sortType === SORT_BY_NAMEORDER) {
      return [...restaurants].sort((a, b) => compareString(a.name, b.name));
    }

    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }
}

export default Restaurants;
