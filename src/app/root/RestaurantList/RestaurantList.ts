import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { RestaurantData } from '../../../type/types';
import { $ } from '../../../util/domSelector';

export default class RestaurantList extends HTMLElement {
  private restaurants: RestaurantData[];

  constructor(restaurants: RestaurantData[]) {
    super();
    this.restaurants = restaurants;
  }

  connectedCallback() {
    const restaurantList: HTMLElement[] = this.createRestaurantList();
    this.render(restaurantList);
  }

  createRestaurantList() {
    return this.restaurants.map((restaurantData) => new RestaurantItem(restaurantData));
  }

  private render(restaurantList: HTMLElement[]) {
    const listContainer = document.createElement('ul');
    listContainer.classList.add('restaurant-list');

    restaurantList.forEach((restaurantItem) => {
      listContainer.appendChild(restaurantItem);
    });

    this.innerHTML = `<section class="restaurant-list-container"></section>`;
    $('.restaurant-list-container').appendChild(listContainer);
  }
}

customElements.define('restaurant-list', RestaurantList);
