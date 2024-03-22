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

    this.addEventListener('click', this.#onClickFavoriteIcon.bind(this));
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

  #onClickFavoriteIcon(event: Event) {
    if (!(event.target instanceof FavoriteIcon)) return;

    const restaurants = new RestaurantDBService().get();
    const changed = (event.target.parentElement?.parentElement as RestaurantItem).get();

    new RestaurantDBService().set(new RestaurantCollection(restaurants).update(changed));

    dom.getElement<MainApp>(document.body, '.main-app-new').render();
  }
}

customElements.define('restaurant-list', RestaurantList, { extends: 'ul' });
export default RestaurantList;
