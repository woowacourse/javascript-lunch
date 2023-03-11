import { DEFAULT_SORTING } from '../../constants';

class Restaurants {
  #restaurants;

  constructor(restaurants) {
    this.#restaurants = restaurants;
  }

  getAll() {
    return this.#restaurants;
  }

  findRestaurant(id) {
    return this.#restaurants.find((restaurant) => restaurant.id === id);
  }

  getFiltered(category, sorting) {
    this.sort(sorting);
    return this.#restaurants.filter(
      (restaurant) => category === '전체' || restaurant.category === category
    );
  }

  getFavorite() {
    this.sort(DEFAULT_SORTING);
    return this.#restaurants.filter((restaurant) => restaurant.favorite === true);
  }

  sort(sorting) {
    const sortPivot = (restaurant) => {
      if (sorting === 'name') return restaurant.name;
      if (sorting === 'distance') return Number(restaurant.takeMinute);
    };

    this.#restaurants.sort((a, b) => {
      if (sortPivot(a) > sortPivot(b)) return 1;
      if (sortPivot(a) < sortPivot(b)) return -1;
      return 0;
    });
  }
}

export default Restaurants;
