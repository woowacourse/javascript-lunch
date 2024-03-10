import RestaurantDBService from '@/domains/services/RestaurantDBService';
import BaseComponent from '../BaseComponent';
import RestaurantItem from './RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';

import './RestaurantList.css';

class RestaurantList extends BaseComponent {
  #restaurantList: IRestaurant[];
  #restaurantDBService: RestaurantDBService;

  constructor() {
    super();
    this.#restaurantDBService = new RestaurantDBService();
    this.#restaurantList = this.#restaurantDBService.get();
  }

  render() {
    const restaurantList = this.#makeRestaurantList(this.#restaurantList);
    this.append(restaurantList);
  }

  repaint(restaurants: IRestaurant[]) {
    this.#removeChildren();
    this.#restaurantList = restaurants;
    const restaurantListAll = this.#makeRestaurantList(this.#restaurantList);
    this.append(restaurantListAll);
  }

  #removeChildren() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  #makeRestaurantList(data: IRestaurant[]) {
    const restaurantList = data.map((restaurant) => new RestaurantItem(restaurant));

    const ulTag = document.createElement('ul');
    ulTag.classList.add('restaurant-list');
    restaurantList.forEach((restaurant) => {
      ulTag.append(restaurant);
    });
    return ulTag;
  }
}

customElements.define('restaurant-list', RestaurantList);
export default RestaurantList;
