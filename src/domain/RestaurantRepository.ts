import RestaurantStorage from '../store/RestaurantStorage';
import { ERROR } from '../constants/Message';

class RestaurantRepository {
  #restaurants: IRestaurant[];

  constructor() {
    this.#restaurants = RestaurantStorage.getRestaurants();
  }

  #getFavoriteRestaurants(): IRestaurant[] {
    return this.#restaurants.filter((restaurant) => restaurant.isFavorite);
  }

  #getFilteredByCategory(restaurants: IRestaurant[], category: TAllCategory): IRestaurant[] {
    return category === '전체' ? restaurants : restaurants.filter((restaurant) => restaurant.category === category);
  }

  #getSortedByName(restaurants: IRestaurant[]): IRestaurant[] {
    return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
  }

  #getSortedByDistance(restaurants: IRestaurant[]): IRestaurant[] {
    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }

  addRestaurant(restaurant: IRestaurant): void {
    this.#restaurants = [...this.#restaurants, restaurant];
    RestaurantStorage.setRestaurants(this.#restaurants);
  }

  getRestaurant(key: number): IRestaurant {
    const restaurant = this.#restaurants.find((restaurant) => restaurant.key === key);

    if (restaurant === undefined) {
      throw new Error(ERROR.NO_RESTAURANT);
    }

    return restaurant;
  }

  removeRestaurant(key: number): void {
    this.#restaurants = this.#restaurants.filter((restaurant: IRestaurant) => restaurant.key !== key);
    RestaurantStorage.setRestaurants(this.#restaurants);
  }

  toggleFavoriteRestaurant(key: number): void {
    this.#restaurants = this.#restaurants.map((restaurant) =>
      restaurant.key === key ? { ...restaurant, isFavorite: !restaurant.isFavorite } : restaurant,
    );

    RestaurantStorage.setRestaurants(this.#restaurants);
  }

  transformRestaurants(category: TAllCategory, sortingOption: TSortingOption, tabOption: TTabOption): IRestaurant[] {
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
}

export default new RestaurantRepository();
