import BaseComponent from '../BaseComponent';
import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';

class RestaurantList extends BaseComponent {
  #restaurantList;
  constructor(restaurantList: IRestaurant[]) {
    super();
    this.#restaurantList = restaurantList;
  }
  render() {
    this.#removeChildren();
    const restaurantList = this.#makeRestaurantList(this.#restaurantList);
    this.append(restaurantList);
  }

  rerender(restaurantList: IRestaurant[]) {
    this.#restaurantList = restaurantList;
    this.render();
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
