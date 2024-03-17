import RestaurantItem from '../components/RestaurantItem';
import { $ } from '../utils/dom';

class RestaurantList {
  #element;
  #restaurantsInstance;
  #restaurants;

  constructor({ targetId, restaurantsInstance }) {
    this.#element = $(targetId);
    this.#restaurantsInstance = restaurantsInstance;
    this.#restaurants = restaurantsInstance.standardList;
  }

  render() {
    const restaurantListHTML = this.#restaurants.reduce((acc, restaurantData) => {
      return (
        acc +
        new RestaurantItem({
          element: this.#element,
          restaurantsInstance: this.#restaurantsInstance,
          restaurant: restaurantData,
        }).getTemplate()
      );
    }, '');

    this.#element.innerHTML = restaurantListHTML;
  }

  updateRestaurantList(newRestaurantList) {
    this.#restaurants = newRestaurantList;

    this.render();
  }
}

export default RestaurantList;
