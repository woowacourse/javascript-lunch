import { Restaurant } from '../types/types';

class Restaurants {
  #restaurants: Restaurant[];

  constructor() {
    const localRestaurants = localStorage.getItem('restaurants');
    this.#restaurants = localRestaurants ? (JSON.parse(localRestaurants) as Restaurant[]) : [];
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

  getRestaurantByFilter(category: string, sortOption: string) {
    const filteredRestaurants = this.filterByCategory(category);
    return this.sortByOption(filteredRestaurants, sortOption);
  }

  getFavoriteRestaurants() {
    return this.#restaurants.filter((restaurant) => restaurant.isFavorite);
  }

  filterByCategory(category: string) {
    if (category === 'all') {
      return [...this.#restaurants];
    }

    return this.#restaurants.filter((restaurant) => category === restaurant.category);
  }

  sortByOption(restaurants: Restaurant[], option: string) {
    if (option === 'latest') {
      return [...restaurants];
    }

    return [...restaurants].sort((a: Restaurant, b: Restaurant) => {
      if (option === 'name') {
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
