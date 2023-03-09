import { Restaurant } from '../types/types';
import './RestaurantList.css';
import './RestaurantDetailModal.css';

export const RestaurantDetailModal = (restaurant: Restaurant, categoryImageUrl: string) => {
  const { category, name, distance, description, link, favoriteImageUrl } = restaurant;

  return `
    <div class="modal-container">
        <div class="category-favorite-icon-container">
            <div class="restaurant__category">
                <img src="${categoryImageUrl}" alt="${category}" class="category-icon" />
            </div>
            <img src="${favoriteImageUrl}" alt="즐겨찾기 아이콘" class="favorite-icon" />
        </div>

        <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body">${description ?? ''}</p>
            <a class="restaurant__link text-body" href="#">${link ?? ''}</a>
        </div>
    </div>`;
};
