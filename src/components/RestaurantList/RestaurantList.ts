import RestaurantDBService from '@/domains/services/RestaurantDBService';
import RestaurantItem from './RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';

import './RestaurantList.css';
import MainApp from '../MainApp';
import FavoriteIcon from '../Basic/FavoriteIcon';

class RestaurantList extends HTMLUListElement {
  #restaurants: IRestaurant[];

  constructor() {
    super();
    this.classList.add('restaurant-list');
    this.#restaurants = [];

    this.addEventListener('click', (event) => {
      if (event.target instanceof FavoriteIcon) {
        const restaurants = this.get();
        new RestaurantDBService().set(restaurants);
        this.paint(restaurants);
      }
    });
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
}

customElements.define('restaurant-list', RestaurantList, { extends: 'ul' });
export default RestaurantList;
