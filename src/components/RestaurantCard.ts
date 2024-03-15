import Restaurant, { IRestaurantInfo } from '../domain/Restaurant';
import RestaurantDetailModal from './RestaurantDetailModal';

class RestaurantCard extends HTMLLIElement {
  #restaurant: IRestaurantInfo;

  constructor(restaurant: IRestaurantInfo) {
    super();
    this.#restaurant = restaurant;
    this.#appendRestaurantElement(this.#restaurant);
    this.#addRestaurantDetailModalEvent();
  }

  #addRestaurantDetailModalEvent() {
    const restaurantDetailModalSection = document.getElementById('restaurant-detail-modal-section');

    this.addEventListener('click', () => {
      if (restaurantDetailModalSection) {
        const restaurantDetailModal = new RestaurantDetailModal(this.#restaurant);
        restaurantDetailModalSection.innerHTML = '';
        restaurantDetailModalSection.appendChild(restaurantDetailModal);
        restaurantDetailModal.toggle();
      }
    });
  }

  #appendRestaurantElement(restaurant: IRestaurantInfo) {
    this.classList.add('restaurant-container');
    this.innerHTML = this.#generateRestaurantElementTemplate(restaurant);
  }

  #generateRestaurantElementTemplate(restaurant: IRestaurantInfo) {
    return /* html */ `
    <div class="restaurant">
      <div class="restaurant__category">
        <img src="./assets/category-${Restaurant.generateImageSrc(restaurant.category)}.png" alt="${
      restaurant.category
    }" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distanceFromCampus}분 내</span>
        <p class="restaurant__description text-body">${restaurant.description}</p>
      </div>
    </div>`;
  }
}

export default RestaurantCard;
