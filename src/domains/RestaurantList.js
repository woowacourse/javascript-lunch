import RestaurantItem from './RestaurantItem.js';

class RestaurantList {
  #restaurants = [];

  constructor(initialDatas = []) {
    initialDatas.forEach((data) => this.addRestaurant(data));
  }

  addRestaurant(restaurantData) {
    this.#restaurants.push(new RestaurantItem(restaurantData));
  }
}

export default RestaurantList;
