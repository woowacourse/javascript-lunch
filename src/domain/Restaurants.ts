import { FilterType, Restaurant } from '../types/types';

class Restaurants {
  #restaurants: Restaurant[];
  #filter: { category: string; sort: string };

  constructor() {
    const localRestaurants = localStorage.getItem('restaurants');
    this.#restaurants = localRestaurants ? (JSON.parse(localRestaurants) as Restaurant[]) : [];
    this.#filter = { category: 'all', sort: 'latest' };
  }

  get items(): Restaurant[] {
    return [...this.#restaurants];
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
    localStorage.setItem('restaurants', JSON.stringify(this.#restaurants));
  }

  removeRestaurant(restaurantName: string) {
    this.#restaurants = this.#restaurants.filter((restaurant) => restaurant.name !== restaurantName);
    console.log(this.#restaurants);
    localStorage.setItem('restaurants', JSON.stringify(this.#restaurants));
  }

  getRestaurantByFilter(type: FilterType, value: string) {
    this.#filter[type] = value;

    const filteredRestaurants = this.filterByCategory();
    return this.sortByOption(filteredRestaurants);
  }

  getFavoriteRestaurants() {
    return this.#restaurants.filter((restaurant) => restaurant.isFavorite);
  }

  filterByCategory() {
    if (this.#filter.category === 'all') {
      return [...this.#restaurants];
    }

    return this.#restaurants.filter((restaurant) => this.#filter.category === restaurant.category);
  }

  sortByOption(restaurants: Restaurant[]) {
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

  toggleFavoriteRestaurant(restaurantName: string) {
    const restaurant = this.#restaurants.find((restaurant) => restaurant.name === restaurantName);

    if (restaurant) {
      restaurant.isFavorite = !restaurant.isFavorite;
      localStorage.setItem('restaurants', JSON.stringify(this.#restaurants));
    }
  }
}

export default Restaurants;
