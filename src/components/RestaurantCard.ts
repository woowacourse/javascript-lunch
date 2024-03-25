import Restaurant, { IRestaurantInfo } from '../domain/Restaurant';
import FavoriteBtn from './Button/FavoriteBtn';
import RestaurantDetailModal from './Modal/RestaurantDetailModal';
import './RestaurantCard.css';

interface Props {
  restaurant: IRestaurantInfo;
  onClick?: () => void;
}

class RestaurantCard {
  #restaurant: IRestaurantInfo;

  #restaurantListElement = document.createElement('li');

  #onClick?: () => void;

  constructor({ restaurant, onClick }: Props) {
    this.#restaurant = restaurant;
    this.#onClick = onClick;
    this.#restaurantListElement.classList.add('restaurant-container');

    this.#init();
  }

  #init() {
    const restaurantContentElement = document.createElement('div');

    restaurantContentElement.id = 'restaurant-card';
    restaurantContentElement.classList.add('restaurant');
    restaurantContentElement.innerHTML = this.#generateRestaurantContentTemplate();

    this.#restaurantListElement.appendChild(restaurantContentElement);
    this.#restaurantListElement.appendChild(this.#makeFavoriteBtn());

    this.#addPopupModalEvent(restaurantContentElement);
  }

  #addPopupModalEvent(restaurantContentElement: HTMLElement) {
    const restaurantDetailModalSection = document.getElementById('restaurant-detail-modal-section');

    restaurantContentElement.addEventListener('click', () => {
      if (restaurantDetailModalSection) {
        const restaurantDetailModal = new RestaurantDetailModal(this.#restaurant, this.#onClick);
        restaurantDetailModalSection.innerHTML = '';
        restaurantDetailModalSection.appendChild(restaurantDetailModal);
        restaurantDetailModal.toggle();
      }
    });
  }

  #makeFavoriteBtn() {
    const favoriteBtn = new FavoriteBtn(this.#restaurant.name, this.#restaurant.isFavorite);

    favoriteBtn.element.addEventListener('click', () => {
      if (this.#onClick) {
        this.#onClick();
      }
    });

    return favoriteBtn.element;
  }

  #generateRestaurantContentTemplate() {
    return /* html */ `
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

  get element() {
    return this.#restaurantListElement;
  }
}

export default RestaurantCard;
