import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { RestaurantData } from '../../../type/RestaurantData';

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

  private clearRestaurantList() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  private render() {
    this.clearRestaurantList();

    this.classList.add('restaurant-list-container');
    this.restaurants.forEach((restaurantData) => {
      const restaurantItem = new RestaurantItem(restaurantData);
      this.appendChild(restaurantItem);
    });
  }
}

customElements.define('restaurant-list', RestaurantList);
