import { Restaurant } from '../types/index';

class RestaurantService {
  private restaurantList: Restaurant[];

  constructor(restaurantList: Restaurant[]) {
    this.restaurantList = restaurantList;
  }

  getRestaurant(restaurantId: number): Restaurant {
    return this.restaurantList.find((restaurant) => restaurant.id === restaurantId)!;
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
    return this.restaurantList.map((restaurant) => {
      if (restaurant.id === restaurantId) {
        return {
          ...restaurant,
          favorite: !restaurant.favorite,
        };
      }

      return restaurant;
    });
  }
}

export default RestaurantService;
