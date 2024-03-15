import RestaurantDBService from '@/domains/services/RestaurantDBService';
import RestaurantItem from './RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';

import './RestaurantList.css';
import MainApp from '../MainApp';

class RestaurantList extends HTMLUListElement {
  #restaurants: IRestaurant[];

  constructor() {
    super();
    this.classList.add('restaurant-list');
    this.#restaurants = [];
    this.addEventListener('click', this.#showDetailListener.bind(this));
  }

  paint(restaurants: IRestaurant[]) {
    this.#restaurants = restaurants;
    this.#removeChildren();

    const restaurantList = this.#restaurants.map((restaurant) => new RestaurantItem(restaurant));
    restaurantList.forEach((restaurant) => {
      this.append(restaurant);
    });
  }

  #removeChildren() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  get() {
    return (Array.from(this.children) as RestaurantItem[]).map((restaurantItem) =>
      restaurantItem.get(),
    );
  }

  #showDetailListener(event: Event) {
    if ((event.target as HTMLElement).classList.contains('restaurant')) {
      (document.querySelector('.main-app-new') as MainApp).paintDetailModal(
        (event.target as RestaurantItem).get(),
      );
    }
  }
}

customElements.define('restaurant-list', RestaurantList, { extends: 'ul' });
export default RestaurantList;
