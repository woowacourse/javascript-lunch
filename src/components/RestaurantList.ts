import { Restaurant, RestaurantType } from './Restaurant';

class RestaurantList {
  #restaurantList: Restaurant[];

  constructor(restaurantList: RestaurantType[]) {
    this.#restaurantList = restaurantList.map((item) => {
      const restaurant = new Restaurant(item);
      return restaurant;
    });
  }

  addRestaurant(restaurant: RestaurantType) {
    this.#restaurantList.push(new Restaurant(restaurant));
  }

  template() {
    return `<ul class="restaurant-list">
    ${this.#restaurantList.map((restaurant) => restaurant.template()).join('')}
    </ul>`;
  }

  setEvent() {
    this.#restaurantList.forEach((restaurant) => {
      restaurant.setEvent();
    });
  }
}

export default RestaurantList;
