import CATEGORY from '../constant/category.js';
import RestaurantIcon from './RestaurantIcon.js';
import RestaurantInfo from './RestaurantInfo.js';

class RestaurantItem {
  constructor(restaurant) {
    const div = this.#createRestaurantItem(restaurant);
    console.log(div);
    return div;
  }

  #createRestaurantItem = (restaurant) => {
    const li = document.createElement('li');

    const icon = new RestaurantIcon(restaurant.getCategory());
    const info = new RestaurantInfo(restaurant.getName(), restaurant.getDistance(), restaurant.getDescription());

    li.classList = 'restaurant';
    li.appendChild(icon);
    li.appendChild(info);

    return li;
  };
}
export default RestaurantItem;
