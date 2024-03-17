import Restaurant, { IRestaurantInfo } from '../domain/Restaurant';
import FavoriteBtn from './FavoriteBtn';
import RestaurantDetailModal from './RestaurantDetailModal';

class RestaurantCard extends HTMLLIElement {
  #restaurant: IRestaurantInfo;

  constructor(restaurant: IRestaurantInfo) {
    super();
    this.#restaurant = restaurant;
    this.#appendRestaurantElement();
    this.#makeFavoriteBtn();
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

  #appendRestaurantElement() {
    this.classList.add('restaurant-container');
    this.appendChild(this.#generateRestaurantElementTemplate());
  }

  #makeFavoriteBtn() {
    const restaurantCard = document.getElementById('restaurant-card');
    const favoriteBtn = new FavoriteBtn(this.#restaurant.isFavorite);

    restaurantCard?.appendChild(favoriteBtn.element);
  }

  #generateRestaurantElementTemplate() {
    const restaurantCard = document.createElement('div');
    restaurantCard.id = 'restaurant-card';
    restaurantCard.classList.add('restaurant');

    restaurantCard.innerHTML = /* html */ `
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

    const favoriteBtn = new FavoriteBtn(this.#restaurant.isFavorite);

    restaurantCard.appendChild(favoriteBtn.element);

    return restaurantCard;
  }
}

export default RestaurantCard;
