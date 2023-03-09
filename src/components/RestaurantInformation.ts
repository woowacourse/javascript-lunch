import { Restaurant } from '../types/types';
import { RESTAURANT_IMAGE, getFavoriteIcon } from '../constants/images';

class RestaurantInformation {
  create(restaurant: Restaurant) {
    return `
      <div class="restaurant-detail__info-container">
        <div class="left-section">
          <div class="restaurant__category">
          <img
            src="${RESTAURANT_IMAGE[restaurant.category]}"
            alt="${restaurant.category}"
            class="category-icon"
          />
          </div>
          <div class="restaurant-detail__info-text">
            <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
            <span class="restaurant__distance text-body">
              캠퍼스부터 ${restaurant.distance}분 내
            </span>
          </div>
        </div>
          <div class="icon-container">
            <div class="restaurant__star">
            <img 
              src="${getFavoriteIcon(restaurant.favorite)}"
              alt=""
              class="restaurant-star"
            />
            </div>
          </div>
        </div>
        <p class="restaurant-detail__description text-body">
          ${restaurant.description ?? ''}
        </p>
        ${`<a ${restaurant.description} class="restaurant__link">웹사이트 방문하기</a>` ?? ''}
      </div>
      <div class="button-container">
      <button
        type="button"
        class="button button--secondary text-caption"
      >
        삭제하기
      </button>
      <button
        id="restaurant-information-close-button"
        class="button button--primary text-caption modal-close-button"
      >
        닫기
      </button>
    </div>
    `;
  }
}

export default new RestaurantInformation();
