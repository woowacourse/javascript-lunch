import RestaurantDBService from '@/domains/services/RestaurantDBService';
import RestaurantItem from './RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';

import './RestaurantList.css';
import FavoriteIcon from '../Basic/FavoriteIcon';
import Restaurant from '@/domains/entities/Restaurant';

class RestaurantList extends HTMLUListElement {
  #restaurants: IRestaurant[];

  constructor() {
    super();
    this.classList.add('restaurant-list');
    this.#restaurants = [];

    this.addEventListener('click', (event) => {
      if (event.target instanceof FavoriteIcon) {
        const restaurants = new RestaurantDBService().get();
        const changed = (
          (event.target as FavoriteIcon).parentElement?.parentElement as RestaurantItem
        ).get();
        const changedRestaurant = new Restaurant(changed);

        const newRestaurants: IRestaurant[] = restaurants.map((restaurant) =>
          new Restaurant(changed).isEqual(restaurant) ? changed : restaurant,
        );
        new RestaurantDBService().set(newRestaurants);
        this.paint(newRestaurants);
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
