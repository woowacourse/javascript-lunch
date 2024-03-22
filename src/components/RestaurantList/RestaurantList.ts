import RestaurantDBService from '@/domains/services/RestaurantDBService';
import RestaurantItem from './RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';

import './RestaurantList.css';
import FavoriteIcon from '../Basic/FavoriteIcon';
import Restaurant from '@/domains/entities/Restaurant';
import MainApp from '../MainApp';
import { dom } from '@/util/dom';
import RestaurantCollection from '@/domains/entities/RestaurantCollection';

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
