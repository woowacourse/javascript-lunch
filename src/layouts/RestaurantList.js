import RestaurantItem from '../components/RestaurantItem';
import { $ } from '../utils/dom';

class restaurantList {
  #element;
  #restaurants;

  constructor({ targetId, restaurants }) {
    this.#element = $(targetId);
    this.#restaurants = restaurants;

    this.#initEventListeners();
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

  #initEventListeners() {}
}

export default restaurantList;
