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

    this.#render();
    this.#setListeners();
  }

  #render() {
    const template = `
      <ul class="restaurants-list" id="restaurant-list"
      >${this.#restaurants
        .map((restaurant: Restaurant) => RestaurantItem.template(restaurant))
        .join('')}</ul
      >
    `;

    this.#parentElement.innerHTML = template;
  }

  #setListeners() {
    $('#restaurant-list').addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement) {
        const restaurantItemId = event.target
          .closest('.restaurant')
          ?.getAttribute('item-id');

        if (typeof restaurantItemId !== 'string') {
          return;
        }

        event.target
          .closest('.favorite-button')
          ?.classList.contains('favorite-button')
          ? this.#parentEvent.onFavoriteButtonClicked(Number(restaurantItemId))
          : this.#parentEvent.onRestaurantItemClicked(Number(restaurantItemId));
      }
    });
  }
}

export default RestaurantList;
