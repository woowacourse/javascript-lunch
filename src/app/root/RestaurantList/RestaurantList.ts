import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { RestaurantDataType } from '../../../type/restaurantDataType';

export default class RestaurantList extends HTMLElement {
  private restaurants: RestaurantDataType[];

  constructor(restaurants: RestaurantDataType[]) {
    super();
    this.restaurants = restaurants;
  }

  connectedCallback() {
    this.render();
  }

  updateRestaurantList(newRestaurants: RestaurantDataType[]) {
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
