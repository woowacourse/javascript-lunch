import RestaurantDBService from '@/domains/services/RestaurantDBService';
import BaseComponent from '../BaseComponent';
import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';

class RestaurantList extends BaseComponent {
  #restaurantList;
  #restaurantDBService: RestaurantDBService;

  constructor() {
    super();
    this.#restaurantDBService = new RestaurantDBService();
    this.#restaurantList = JSON.parse(this.#restaurantDBService.get() || '');
  }

  render() {
    const restaurantList = this.#makeRestaurantList(this.#restaurantList);
    this.append(restaurantList);
  }

  rerender(restaurantList: IRestaurant[]) {
    this.#removeChildren();
    this.#restaurantList = restaurantList;
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