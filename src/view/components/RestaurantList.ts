import RestaurantItem from './RestaurantItem';
import { Restaurant } from '../../type/common';

type RestaurantListProps = {
  $target: HTMLElement;
  restaurants: Restaurant[];
};

class RestaurantList {
  #target;
  #restaurants;

  constructor({ $target, restaurants }: RestaurantListProps) {
    this.#target = $target;
    this.#restaurants = restaurants;

    this.#render();
  }

  #template() {
    return `
        <ul class="restaurant-list"></ul>
      `;
  }

  #render() {
    this.#target.innerHTML = this.#template();
    this.#mounted();
  }

  #mounted() {
    this.#restaurants.forEach((restaurant: Restaurant) => {
      new RestaurantItem({
        $target: document.querySelector('.restaurant-list') as HTMLElement,
        restaurant: restaurant,
      });
    });
  }
}

export default RestaurantList;
