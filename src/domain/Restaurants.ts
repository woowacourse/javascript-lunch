import { FilterType, Restaurant, StorageType } from '../types/types';

class Restaurants {
  #storage: StorageType;
  #restaurants: Restaurant[];
  #filter: { category: string; sort: string };

  static STORAGE_KEY = 'restaurants';

  constructor(storage: StorageType) {
    this.#storage = storage;
    this.#restaurants = this.#storage.getItem<Restaurant[]>(Restaurants.STORAGE_KEY) ?? [];
    this.#filter = { category: 'all', sort: 'latest' };
  }

  get items(): Restaurant[] {
    return [...this.#restaurants];
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
    this.#storage.setItem(Restaurants.STORAGE_KEY, this.#restaurants);
  }

  removeRestaurant(restaurantName: string) {
    this.#restaurants = this.#restaurants.filter((restaurant) => restaurant.name !== restaurantName);
    this.#storage.setItem(Restaurants.STORAGE_KEY, this.#restaurants);
  }

  toggleFavoriteRestaurant(restaurantName: string) {
    const restaurant = this.#restaurants.find((restaurant) => restaurant.name === restaurantName);

    if (restaurant) {
      restaurant.isFavorite = !restaurant.isFavorite;
      this.#storage.setItem(Restaurants.STORAGE_KEY, this.#restaurants);
    }
  }

  getRestaurantByFilter(type: FilterType, value: string) {
    this.#filter[type] = value;

    const filteredRestaurants = this.#filterByCategory();
    return this.#sortByOption(filteredRestaurants);
  }

  getFavoriteRestaurants() {
    return this.#restaurants.filter((restaurant) => restaurant.isFavorite);
  }

  #filterByCategory() {
    if (this.#filter.category === 'all') {
      return [...this.#restaurants];
    }

    return this.#restaurants.filter((restaurant) => this.#filter.category === restaurant.category);
  }

  #sortByOption(restaurants: Restaurant[]) {
    if (this.#filter.sort === 'latest') {
      return [...restaurants];
    }

    return [...restaurants].sort((a: Restaurant, b: Restaurant) => {
      if (this.#filter.sort === 'name') {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      }

      return a.distance - b.distance;
    });
  }
}

export default Restaurants;
