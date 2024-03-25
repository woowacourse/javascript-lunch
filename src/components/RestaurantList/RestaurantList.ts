import RestaurantItem from './RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';

import './RestaurantList.css';

class RestaurantList extends HTMLUListElement {
  #restaurants: IRestaurant[];

  constructor() {
    super();
    this.classList.add('restaurant-list');
    this.#restaurants = [];
  }

  paint(restaurants: IRestaurant[]) {
    this.#restaurants = restaurants;
    this.replaceChildren();

    const restaurantList = this.#restaurants.map((restaurant) => new RestaurantItem(restaurant));
    this.append(...restaurantList);
  }

  get() {
    return this.#restaurants;
  }
}

customElements.define('restaurant-list', RestaurantList, { extends: 'ul' });
export default RestaurantList;
