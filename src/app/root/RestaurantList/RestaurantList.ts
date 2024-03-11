import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { RestaurantData } from '../../../type/types';

export default class RestaurantList extends HTMLElement {
  private restaurants: RestaurantData[];

  constructor(restaurants: RestaurantData[]) {
    super();
    this.restaurants = restaurants;
  }

  connectedCallback() {
    this.render();
  }

  updateRestaurantList(newRestaurants: RestaurantData[]) {
    this.restaurants = newRestaurants;
    this.render();
  }

  private createRestaurantList() {
    const restaurantList = document.createElement('ul');
    restaurantList.className = 'restaurant-list';

    this.restaurants.forEach((restaurantData) => {
      const restaurantItem = new RestaurantItem(restaurantData);
      restaurantList.appendChild(restaurantItem);
    });
    return restaurantList;
  }

  private render() {
    this.innerHTML = ``;
    const section = document.createElement('section');
    section.className = 'restaurant-list-container';

    section.appendChild(this.createRestaurantList());
    this.appendChild(section);
  }
}

customElements.define('restaurant-list', RestaurantList);
