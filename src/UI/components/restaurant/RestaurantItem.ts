import Restaurant from '../../../Domain/Restaurant';
import RestaurantIcon from './RestaurantIcon';
import RestaurantInfo from './RestaurantInfo';

class RestaurantItem {
  private element: HTMLLIElement;

  constructor(restaurant: Restaurant) {
    this.element = this.#createRestaurantItem(restaurant);
  }

  #createRestaurantItem(restaurant: Restaurant): HTMLLIElement {
    const li = document.createElement('li');

    const icon = new RestaurantIcon(restaurant.getCategory());
    const info = new RestaurantInfo(restaurant);

    li.classList.add('restaurant');
    li.appendChild(icon.getElement());
    li.appendChild(info.getElement());

    return li;
  }

  getElement(): HTMLLIElement {
    return this.element;
  }
}
export default RestaurantItem;
