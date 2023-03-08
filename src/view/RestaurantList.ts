import { Restaurant } from '../type';
import { $ } from '../util/querySelector';
import RestaurantItem from './components/RestaurantItem';

type RestaurantListType = {
  parentElement: HTMLElement;
  restaurants: Restaurant[];
  parentEvent: {
    onRestaurantItemClicked: (index: number) => void;
    onFavoriteButtonClicked: (index: number) => void;
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

    console.log(restaurants);
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
      console.log(restaurant, restaurant.itemId);
      new RestaurantItem({
        parentElement: $(`#restaurant-list`),
        restaurant: restaurant,
        parentEvent: {
          onItemClicked: (itemId: number) =>
            this.#parentEvent.onRestaurantItemClicked(itemId),
          onFavoriteButtonClicked: (itemId: number) =>
            this.#parentEvent.onFavoriteButtonClicked(itemId),
        },
      });
    });
  }
}

export default RestaurantList;
