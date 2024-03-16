import RestaurantDBService from '@/domains/services/RestaurantDBService';
import BaseComponent from '../BaseComponent';
import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';
import { removeAllChildren } from '@/utils/view';
import EmptyView from '../EmptyView/EmptyView';

class RestaurantList extends BaseComponent {
  #restaurantList;
  #restaurantDBService: RestaurantDBService;

  constructor() {
    super();
    this.#restaurantDBService = new RestaurantDBService();
    this.#restaurantList = JSON.parse(this.#restaurantDBService.get() || '[]');
  }

  render() {
    this.#showEmptyView();
    const restaurantList = this.#makeRestaurantList(this.#restaurantList);
    this.append(restaurantList);
  }

  rerender(restaurantList: IRestaurant[]) {
    removeAllChildren(this);
    this.#restaurantList = restaurantList;
    this.#showEmptyView();
    const restaurantListAll = this.#makeRestaurantList(this.#restaurantList);
    this.append(restaurantListAll);
  }

  #showEmptyView() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('tab') === 'favorite') {
      if (!this.#restaurantList.length || !this.#restaurantList) {
        return this.append(new EmptyView('favorite'));
      }
    } else {
      if (!this.#restaurantList.length || !this.#restaurantList) {
        return this.append(new EmptyView('all'));
      }
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
