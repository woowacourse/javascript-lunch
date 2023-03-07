import { LOCAL_STORAGE_KEY } from '../constant';
import { Restaurant } from '../type';
import storage from '../util/storage';

class Restaurants {
  #restaurants: Restaurant[] = storage.getData(LOCAL_STORAGE_KEY) || [];
  #filterBy: string = '전체';
  #sortBy: string = 'name';

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
  }

  getRestaurants() {
    const filteredRestaurants = this.#getFilteredRestaurantsByCategory(
      [...this.#restaurants],
      this.#filterBy
    );

    const sortedRestaurants =
      this.#sortBy === 'name'
        ? this.#getSortedRestaurantsByName(filteredRestaurants)
        : this.#getSortedRestaurantsByDistanceInMinutes(filteredRestaurants);

    return sortedRestaurants;
  }

  saveRestaurantsToLocalStorage() {
    storage.setData(LOCAL_STORAGE_KEY, this.#restaurants);
  }

  setFilterBy(filterBy: string) {
    this.#filterBy = filterBy;
  }

  setSortBy(sortBy: string) {
    this.#sortBy = sortBy;
  }

  getRestaurantByIndex(index: number) {
    return this.getRestaurants()[index];
  }

  #getSortedRestaurantsByName(restaurants: Restaurant[]) {
    return [...restaurants].sort((x, y) => x.name.localeCompare(y.name));
  }

  #getSortedRestaurantsByDistanceInMinutes(restaurants: Restaurant[]) {
    return [...restaurants].sort(
      (x, y) => Number(x.distanceInMinutes) - Number(y.distanceInMinutes)
    );
  }

  #getFilteredRestaurantsByCategory(
    restaurants: Restaurant[],
    category: string
  ) {
    if (category === '전체') {
      return restaurants;
    }

    return [...restaurants].filter(
      (restaurant) => restaurant.category === category
    );
  }
}

export default Restaurants;
