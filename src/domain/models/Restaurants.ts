import type { Category, Restaurant, Sorting } from '../../type';
import { DEFAULT_SORTING } from '../../constants';

class Restaurants {
  #restaurants;

  constructor(restaurants: Restaurant[]) {
    this.#restaurants = restaurants;
  }

  getAll() {
    return this.#restaurants;
  }

  findRestaurant(id: string) {
    return this.#restaurants.find((restaurant) => restaurant.id === id);
  }

  getFiltered(category: Category, sorting: Sorting) {
    this.sort(sorting);
    return this.#restaurants.filter(
      (restaurant) => category === '전체' || restaurant.category === category
    );
  }

  getFavorite() {
    this.sort(DEFAULT_SORTING);
    return this.#restaurants.filter((restaurant) => restaurant.favorite === true);
  }

  sort(sorting: Sorting) {
    const sortPivot = (restaurant: Restaurant) => {
      if (sorting === 'name') return restaurant.name;
      if (sorting === 'takeMinute') return Number(restaurant.takeMinute);
      return 0;
    };

    this.#restaurants.sort((a, b) => {
      if (sortPivot(a) > sortPivot(b)) return 1;
      if (sortPivot(a) < sortPivot(b)) return -1;
      return 0;
    });
  }
}

export default Restaurants;
