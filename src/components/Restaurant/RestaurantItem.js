import CATEGORY from '../../constant/category.js';
import RestaurantIcon from './RestaurantIcon.js';
import RestaurantInfo from './RestaurantInfo.js';
import Star from './Star.js';

class RestaurantItem {
  #restaurantElement;
  #onRestaurantUpdate;
  #detailModal;
  #restaurant;

  constructor(restaurant, onRestaurantUpdate, detailModal) {
    this.#onRestaurantUpdate = onRestaurantUpdate;
    this.#detailModal = detailModal;
    this.#restaurant = restaurant;
    this.#createRestaurantItem(restaurant);
    this.#bindEvent(this.#restaurantElement);
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

    this.#restaurantElement = li;
  };

  #bindEvent = (element) => {
    element.addEventListener('click', (event) => {
      if (event.target.closest('.star-icon')) {
        return;
      }

      const clonedRestaurant = new RestaurantItem(
        this.#restaurant,
        this.#onRestaurantUpdate,
        this.#detailModal,
      ).getElement();

      this.#detailModal.addRestaurant(clonedRestaurant, this.#restaurant);
      this.#detailModal.openModal();
    });
  };

  getElement() {
    return this.#restaurantElement;
  }
}
export default RestaurantItem;
