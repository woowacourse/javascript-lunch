import Restaurant, { IRestaurantInfo } from './Restaurant';

class RestaurantCatalog {
  #restaurants: Restaurant[] = [];

  pushNewRestaurant(restaurantInfo: IRestaurantInfo) {
    this.#restaurants.forEach((restaurant: Restaurant) => {
      if (restaurant.getInfo().name === restaurantInfo.name) {
        throw new Error('❌');
      }
    });

    const newRestaurant = new Restaurant(restaurantInfo);
    this.#restaurants.push(newRestaurant);
  }

  getRestaurants() {
    return [...this.#restaurants];
  }
}

export default RestaurantCatalog;
