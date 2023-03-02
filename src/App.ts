import Validator from './domain/Validator';
import Restaurants from './domain/Restaurants';

import Header from './view/components/Header';
import RestaurantList from './view/components/RestaurantList';

import { Restaurant } from './type/common';
import { menu1, menu2, menu3, menu4 } from './data/dummy';

import { $ } from './utils/querySelector';

/* 더미 데이터 */
const dummyData = [menu1, menu2, menu3, menu4];

type StateType = {
  restaurants?: Restaurant[];
};

class App {
  #root;
  #state: StateType;
  #restaurants = new Restaurants();

  constructor($target: HTMLElement) {
    this.#root = $target;
    this.#state = {
      restaurants: [],
    };

    this.render();
  }

  #template() {
    return `
      <header class="gnb"></header>
      <section class="restaurant-list-container"></section>
    `;
  }

  #mounted() {
    new Header({
      $target: $('.gnb') as HTMLElement,
      addRestaurantEvent: this.addRestaurantEvent.bind(this),
    });

    new RestaurantList({
      $target: document.querySelector(
        '.restaurant-list-container'
      ) as HTMLElement,
      restaurants: dummyData,
      // restaurants: this.#state.restaurants as Restaurant[],
      $target: $('.restaurant-list-container') as HTMLElement,
    });
  }

  render() {
    this.#root.innerHTML = this.#template();
    this.#mounted();
  }

  setState(newData: StateType) {
    this.#state = { ...this.#state, ...newData };
    this.render();
  }

  addRestaurantEvent(restaurant: Restaurant) {
    this.#restaurants.addRestaurant(restaurant);
    this.setState({ restaurants: this.#restaurants.getRestaurants() });
  }
}

export default App;
