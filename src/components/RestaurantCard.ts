import Restaurant, { IRestaurantInfo } from '../domain/Restaurant';
import FavoriteBtn from './FavoriteBtn';
import RestaurantDetailModal from './RestaurantDetailModal';

class RestaurantCard extends HTMLLIElement {
  #restaurant: IRestaurantInfo;

  #restaurantCardElement: HTMLElement = document.createElement('div');

  constructor(restaurant: IRestaurantInfo) {
    super();
    this.#restaurant = restaurant;

    this.classList.add('restaurant-container');
    this.#restaurantCardElement.id = 'restaurant-card';
    this.#restaurantCardElement.classList.add('restaurant');

    this.#appendRestaurantElement();
    this.#addRestaurantDetailModalEvent();
  }

  #addRestaurantDetailModalEvent() {
    const restaurantDetailModalSection = document.getElementById('restaurant-detail-modal-section');

    this.#restaurantCardElement.addEventListener('click', () => {
      if (restaurantDetailModalSection) {
        const restaurantDetailModal = new RestaurantDetailModal(this.#restaurant);
        restaurantDetailModalSection.innerHTML = '';
        restaurantDetailModalSection.appendChild(restaurantDetailModal);
        restaurantDetailModal.toggle();
      }
    });
  }

  #appendRestaurantElement() {
    this.appendChild(this.#restaurantCardElement);
    this.#generateRestaurantElementTemplate();
    this.#makeFavoriteBtn();
  }

  #makeFavoriteBtn() {
    const favoriteBtn = new FavoriteBtn(this.#restaurant.name, this.#restaurant.isFavorite);

    this.appendChild(favoriteBtn.element);
  }

  #generateRestaurantElementTemplate() {
    this.#restaurantCardElement.innerHTML = /* html */ `
    <div class="restaurant__info__container">
      <div class="restaurant__category">
        <img src="./assets/category-${Restaurant.generateImageSrc(this.#restaurant.category)}.png" alt="${
      this.#restaurant.category
    }" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${this.#restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${this.#restaurant.distanceFromCampus}분 내</span>
        <p class="restaurant__description text-body">${this.#restaurant.description}</p>
      </div>
    </div>`;
  }
}

export default RestaurantCard;
