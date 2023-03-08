import { Restaurant } from '../types/types';
import { RESTAURANT_IMAGE, getFavoriteIcon } from '../constants/images';

class RestaurantInformation {
  private restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  create() {
    return `
      <div class="restaurant-detail__info-container">
        <div class="left-section">
          <div class="restaurant__category">
          <img
            src="${RESTAURANT_IMAGE[this.restaurant.category]}"
            alt="${this.restaurant.category}"
            class="category-icon"
          />
          </div>
          <div class="restaurant-detail__info-text">
            <h3 class="restaurant__name text-subtitle">${this.restaurant.name}</h3>
            <span class="restaurant__distance text-body">
              캠퍼스부터 ${this.restaurant.distance}분 내
            </span>
          </div>
        </div>
          <div class="icon-container">
            <div class="restaurant__star">
            <img 
              src="${getFavoriteIcon(this.restaurant.favorite)}"
              alt=""
              class="restaurant-star"
            />
            </div>
          </div>
        </div>
        <p class="restaurant-detail__description text-body">
          ${this.restaurant.description ?? ''}
        </p>
        ${`<a ${this.restaurant.description} class="restaurant__link">웹사이트 방문하기</a>` ?? ''}
        <div class="button-container">
          <button
            type="button"
            id="modal-close-button"
            class="button button--secondary text-caption"
          >
            취소하기
          </button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </div>
    `;
  }
}

export default RestaurantInformation;
