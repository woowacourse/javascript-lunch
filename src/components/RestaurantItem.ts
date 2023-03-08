import { Restaurant } from '../types/types';
import { RESTAURANT_IMAGE, getFavoriteIcon } from '../constants/images';

class RestaurantItem {
  private restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  create() {
    return `
      <li class="restaurant">
        <div class="restaurant__category">
          <img
            src="${RESTAURANT_IMAGE[this.restaurant.category]}"
            alt="${this.restaurant.category}"
            class="category-icon"
          />
        </div>
        <div class="restaurant__info-container">
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${this.restaurant.name}</h3>
            <span class="restaurant__distance text-body"
              >캠퍼스부터 ${this.restaurant.distance}분 내</span
            >
            <p class="restaurant__description text-body">
              ${this.restaurant.description ?? ''}
            </p>
          </div>
          <div class="restaurant__star">
            <img 
              src="${getFavoriteIcon(this.restaurant.favorite)}"
              alt=""
              class="restaurant-star-icon ${this.restaurant.favorite && 'favorite'}"
              data-id="${this.restaurant.id}"
            />
            </div>
        </div>
      </li>`;
  }
}

export default RestaurantItem;
