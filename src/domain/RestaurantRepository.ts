import RestaurantStorage from '../store/RestaurantStorage';
import { generateRandomNumber } from '../utils/random';

class RestaurantRepository {
  #restaurants;

  constructor() {
    this.#restaurants = RestaurantStorage.getRestaurants();
  }

  #getFavoriteRestaurants() {
    return this.#restaurants.filter((restaurant) => restaurant.isFavorite);
  }

  #getFilteredByCategory(restaurants: IRestaurant[], category: TAllCategory) {
    return category === '전체' ? restaurants : restaurants.filter((restaurant) => restaurant.category === category);
  }

  #getSortedByName(restaurants: IRestaurant[]) {
    return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
  }

  #getSortedByDistance(restaurants: IRestaurant[]) {
    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants = [...this.#restaurants, { key: generateRandomNumber(), ...restaurant }];
    RestaurantStorage.setRestaurants(this.#restaurants);
  }

  getRestaurant(key: number) {
    return this.#restaurants.find((restaurant) => restaurant.key === key);
  }

  removeRestaurant(key: number) {
    this.#restaurants = this.#restaurants.filter((restaurant: IRestaurant) => restaurant.key !== key);
    RestaurantStorage.setRestaurants(this.#restaurants);
  }

  transformRestaurants(category: TAllCategory, sortingOption: TSortingOption, tabOption: TTabOption) {
    let filteredRestaurants;

    if (tabOption === '자주 가는 음식점') {
      filteredRestaurants = this.#getFilteredByCategory(this.#getFavoriteRestaurants(), category);
    } else {
      filteredRestaurants = this.#getFilteredByCategory(this.#restaurants, category);
    }

    return sortingOption === '이름순'
      ? this.#getSortedByName(filteredRestaurants)
      : this.#getSortedByDistance(filteredRestaurants);
  }

  toggleFavoriteRestaurant(key: number) {
    this.#restaurants = this.#restaurants.map((restaurant) =>
      restaurant.key === key ? { ...restaurant, isFavorite: !restaurant.isFavorite } : restaurant,
    );

    console.log(this.#restaurants);

    RestaurantStorage.setRestaurants(this.#restaurants);
  }
}

export default new RestaurantRepository();
