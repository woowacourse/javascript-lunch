import RestaurantDBService from '@/domains/services/RestaurantDBService';
import RestaurantItem from './RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';

import './RestaurantList.css';
import FavoriteIcon from '../Basic/FavoriteIcon';
import Restaurant from '@/domains/entities/Restaurant';
import MainApp from '../MainApp';
import { dom } from '@/util/dom';

class RestaurantList extends HTMLUListElement {
  #restaurants: IRestaurant[];

  constructor() {
    super();
    this.classList.add('restaurant-list');
    this.#restaurants = [];

    this.addEventListener('click', (event) => {
      if (!(event.target instanceof FavoriteIcon)) return;

      const restaurants = new RestaurantDBService().get();
      const changed = (event.target.parentElement?.parentElement as RestaurantItem).get();

      const newRestaurants = restaurants.map((restaurant) =>
        new Restaurant(changed).isEqual(restaurant) ? changed : restaurant,
      );
      new RestaurantDBService().set(newRestaurants);

      dom.getElement<MainApp>(document.body, '.main-app-new').paint();
    });
  }

  paint(restaurants: IRestaurant[]) {
    this.#restaurants = restaurants;
    this.replaceChildren();

    const restaurantList = this.#restaurants.map((restaurant) => new RestaurantItem(restaurant));
    this.append(...restaurantList);
  }

  get() {
    return (Array.from(this.children) as RestaurantItem[]).map((restaurantItem) =>
      restaurantItem.get(),
    );
  }
}

customElements.define('restaurant-list', RestaurantList, { extends: 'ul' });
export default RestaurantList;
