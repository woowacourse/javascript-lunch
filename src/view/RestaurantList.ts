import { Restaurant } from '../type';
import { $ } from '../util/querySelector';
import RestaurantItem from './components/RestaurantItem';

type RestaurantListType = {
  parentElement: HTMLElement;
  restaurants: Restaurant[];
};

class RestaurantList {
  #parentElement;
  #restaurants;

  constructor({ parentElement, restaurants }: RestaurantListType) {
    this.#parentElement = parentElement;
    this.#restaurants = restaurants;

    this.#render();
    this.#renderRestaurantItems();
  }

  #render() {
    const template = `
      <ul class="restaurants-list" id="restaurant-list"></ul>
    `;

    this.#parentElement.innerHTML = template;
  }

  #renderRestaurantItems() {
    this.#restaurants.forEach((restaurant: Restaurant) => {
      new RestaurantItem({
        parentElement: $(`#restaurant-list`) as HTMLElement,
        restaurant: restaurant,
      });
    });
  }
}

export default RestaurantList;
