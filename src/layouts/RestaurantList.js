import RestaurantItem from '../components/RestaurantItem';
import { $ } from '../utils/dom';

class RestaurantList {
  #element;
  #restaurants;

  constructor({ targetId, restaurants }) {
    this.#element = $(targetId);
    this.#restaurants = restaurants;
  }

  render() {
    const restaurantListHTML = this.#restaurants.reduce((acc, restaurantData) => {
      return (
        acc +
        new RestaurantItem({ element: this.#element, restaurant: restaurantData }).getTemplate()
      );
    }, '');

    this.#element.innerHTML = restaurantListHTML;
  }
}

export default RestaurantList;
