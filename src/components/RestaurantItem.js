import generateRestaurantItem from './template/generateRestaurantItem';

class RestaurantItem {
  #restaurant;

  constructor(restaurant) {
    this.#restaurant = restaurant;
    this.#initEventListeners();
  }

  getTemplate() {
    return generateRestaurantItem(this.#restaurant);
  }

  #initEventListeners() {}

  #handleFavoriteButtonStatusChange(event) {}
}

export default RestaurantItem;
