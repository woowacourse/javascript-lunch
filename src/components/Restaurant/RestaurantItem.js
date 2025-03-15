import CATEGORY from '../../constant/category.js';
import RestaurantIcon from './RestaurantIcon.js';
import RestaurantInfo from './RestaurantInfo.js';
import Star from './star.js';

class RestaurantItem {
  #restaurant;
  #onRestaurantUpdate;
  #restaurantModal;

  constructor(restaurant, onRestaurantUpdate, restaurantModal) {
    this.#onRestaurantUpdate = onRestaurantUpdate;
    this.#restaurantModal = restaurantModal;
    this.#createRestaurantItem(restaurant);
    this.#bindEvent();
  }

  #createRestaurantItem = (restaurant) => {
    const li = document.createElement('li');

    const icon = new RestaurantIcon(restaurant.getCategory());
    const star = new Star(restaurant, this.#onRestaurantUpdate).getElement();
    const info = new RestaurantInfo(restaurant.getName(), restaurant.getDistance(), restaurant.getDescription());

    li.classList = 'restaurant';
    li.appendChild(icon);
    li.appendChild(info);
    li.appendChild(star);

    this.#restaurant = li;
  };

  #bindEvent = () => {
    this.#restaurant.addEventListener('click', (event) => {
      if (event.target.closest('.star-icon')) {
        return;
      }

      const clonedElement = this.#restaurant.cloneNode(true);
      clonedElement.id = 'restaurant-in-modal';

      this.#restaurantModal.addRestaurant(clonedElement);
      this.#restaurantModal.openModal();
    });
  };

  getElement() {
    return this.#restaurant;
  }
}
export default RestaurantItem;
