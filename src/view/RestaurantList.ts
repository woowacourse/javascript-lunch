import { Restaurant } from '../type';
import { $ } from '../util/querySelector';
import RestaurantItem from './components/RestaurantItem';

type RestaurantListType = {
  parentElement: HTMLElement;
  restaurants: Restaurant[];
  parentEvent: {
    onRestaurantItemClicked: (index: number) => void;
  };
};

class RestaurantList {
  #parentElement;
  #restaurants;
  #parentEvent;

  constructor({ parentElement, restaurants, parentEvent }: RestaurantListType) {
    this.#parentElement = parentElement;
    this.#restaurants = restaurants;
    this.#parentEvent = parentEvent;

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
    this.#restaurants.forEach((restaurant: Restaurant, index: number) => {
      new RestaurantItem({
        parentElement: $(`#restaurant-list`),
        restaurant: restaurant,
        index: index,
        parentEvent: {
          onItemClicked: (index: number) =>
            this.#parentEvent.onRestaurantItemClicked(index),
        },
      });
    });
  }
}

export default RestaurantList;
