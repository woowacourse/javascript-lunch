import { generateRestaurantItems } from '../components/template/generateRestaurantItems';
import { $ } from '../utils/dom';

class RestaurantList {
  #element;
  #restaurantsInstance;
  #restaurants;
  #restaurantDetailModalInstance;

  constructor({ targetId, restaurantsInstance, restaurantDetailModalInstance }) {
    this.#element = $(targetId);
    this.#restaurantsInstance = restaurantsInstance;
    this.#restaurants = restaurantsInstance.standardList;
    this.#restaurantDetailModalInstance = restaurantDetailModalInstance;

    this.#initEventListeners();
  }

  render() {
    this.#element.innerHTML = generateRestaurantItems(this.#restaurants);
  }

  #initEventListeners() {
    this.#element.addEventListener('click', this.#handleRestaurantItemClick.bind(this));
  }

  #handleRestaurantItemClick(event) {
    const restaurantElement = event.target.closest('#restaurant-info');

    if (restaurantElement) {
      const restaurantName = restaurantElement.dataset.restaurantName;

      const restaurant = this.#restaurantsInstance.standardList.find(
        (restaurant) => restaurant.name === restaurantName,
      );
      this.#restaurantDetailModalInstance.render(restaurant);
      this.#restaurantDetailModalInstance.openModal('restaurant-detail-modal');
    }
  }

  updateRestaurantList(newRestaurantList) {
    this.#restaurants = newRestaurantList;

    this.render();
  }
}

export default RestaurantList;
