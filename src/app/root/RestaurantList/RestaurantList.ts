import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { ILocation } from '../../../interface/interface';

class RestaurantList extends HTMLElement {
  private restaurants: ILocation[];

  constructor(restaurants: ILocation[]) {
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
    const restaurantListContainer = this.querySelector('.restaurant-list-container');
    if (restaurantListContainer) restaurantListContainer.appendChild(listContainer);
  }
}

customElements.define('restaurant-list', RestaurantList);
export default RestaurantList;
