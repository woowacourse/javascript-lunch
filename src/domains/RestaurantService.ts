import { Restaurant } from '../types/types';

class RestaurantService {
  private restaurantList: Restaurant[];

  constructor(restaurantList: Restaurant[]) {
    this.restaurantList = restaurantList;
  }

  add(restaurant: Restaurant) {
    restaurant.id = this.restaurantList[this.restaurantList.length - 1].id + 1;
    this.restaurantList.push({ ...restaurant });
  }

  delete(restaurantId: number) {
    const restaurantIndex = this.findRestaurantIndex(restaurantId);
    this.restaurantList.splice(restaurantIndex, 1);

    return [...this.restaurantList];
  }

  findRestaurantIndex(restaurantId: number) {
    return this.restaurantList.findIndex((restaurant) => restaurant.id === restaurantId);
  }

  getFavoriteRestaurantList() {
    return this.restaurantList.filter((restaurant) => restaurant.favorite);
  }

  getRestaurant(restaurantId: number) {
    return this.restaurantList.find((restaurant) => restaurant.id === restaurantId) as Restaurant;
  }

  getRestaurantList() {
    return [...this.restaurantList];
  }

  updateFavorite(restaurantId: number) {
    const restaurantIndex = this.findRestaurantIndex(restaurantId);
    this.restaurantList[restaurantIndex].favorite = !this.restaurantList[restaurantIndex].favorite;

    return [...this.restaurantList];
  }
}

export default RestaurantService;
