import { Restaurant } from '../types/index';
import { RESTAURANT_IMAGE, getFavoriteIcon } from '../constants/images';

function createRestaurantItem(restaurant: Restaurant) {
  return `
    <li class="restaurant" data-id="${restaurant.id}">
      <div class="restaurant__category">
        <img
          src="${RESTAURANT_IMAGE[restaurant.category]}"
          alt="${restaurant.category}"
          class="category-icon"
        />
      </div>
      <div class="restaurant__info-container">
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${restaurant.distance}분 내</span
          >
          <p class="restaurant__description text-body">
            ${restaurant.description ?? ''}
          </p>
        </div>
        <div class="restaurant__star">
          <img 
            src="${getFavoriteIcon(restaurant.favorite)}"
            alt=""
            class="restaurant-star-icon ${restaurant.favorite ? 'favorite' : ''}"
          />
          </div>
      </div>
    </li>`;
}

export { createRestaurantItem };
