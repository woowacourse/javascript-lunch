import CATEGORY from '../../constant/category.js';
import RestaurantIcon from './RestaurantIcon.js';
import RestaurantInfo from './RestaurantInfo.js';
import Star from './star.js';

class RestaurantItem {
  #restaurant;
  #onRestaurantUpdate;
  #restaurantModal;
  #restaurantData;

  constructor(restaurantData, onRestaurantUpdate, restaurantModal) {
    this.#onRestaurantUpdate = onRestaurantUpdate;
    this.#restaurantModal = restaurantModal;
    this.#restaurantData = restaurantData;
    this.#createRestaurantItem(restaurantData);
    this.#bindEvent(this.#restaurant);
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

  #bindEvent = (element) => {
    element.addEventListener('click', (event) => {
      if (event.target.closest('.star-icon')) {
        return;
      }

      const clonedRestaurant = new RestaurantItem(
        this.#restaurantData,
        this.#onRestaurantUpdate,
        this.#restaurantModal,
      );
      const clonedElement = clonedRestaurant.getElement();

      this.#restaurantModal.addRestaurant(clonedElement, this.#restaurant);
      this.#restaurantModal.openModal();
    });
  };

  getElement() {
    return this.#restaurant;
  }
}
export default RestaurantItem;
