import { Restaurant } from '../types/types';

class RestaurantService {
  private restaurantList: Restaurant[];

  constructor(restaurantList: Restaurant[]) {
    this.restaurantList = restaurantList;
  }

  getRestaurant(restaurantId: number) {
    return this.restaurantList.find((restaurant) => restaurant.id === restaurantId) as Restaurant;
  }

  getRestaurantList() {
    return [...this.restaurantList];
  }

  getFavoriteRestaurantList() {
    return this.restaurantList.filter((restaurant) => restaurant.favorite);
  }

  findRestaurantIndex(restaurantId: number) {
    return this.restaurantList.findIndex((restaurant) => restaurant.id === restaurantId);
  }

  add(restaurant: Restaurant) {
    restaurant.id = this.restaurantList[this.restaurantList.length - 1].id + 1;
    this.restaurantList.push({ ...restaurant });
  }

  delete(restaurantId: number) {
    return this.restaurantList.filter((restaurant) => restaurant.id !== restaurantId);
  }

  updateFavorite(restaurantId: number) {
    const restaurantIndex = this.findRestaurantIndex(restaurantId);
    this.restaurantList[restaurantIndex].favorite = !this.restaurantList[restaurantIndex].favorite;

    return [...this.restaurantList];
  }
}

export default RestaurantService;
