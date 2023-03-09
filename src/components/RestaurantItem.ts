import { Restaurant } from '../types/types';

export const RestaurantItem = (restaurant: Restaurant, categoryImageUrl: string) => {
  const { category, name, distance, description, favoriteImageUrl } = restaurant;

  return `<li class="restaurant">
  
  <div class="restaurant__category">
    <img src="${categoryImageUrl}" 
    alt="${category}" class="category-icon"/>
  </div>

  <div class="restaurant__info">
    <h3 class="restaurant__name text-subtitle">${name}</h3>
    <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
    <p class="restaurant__description text-body">${description ?? ''}</p>

    <button type="button" class="favorite-button" style="background-image: url('${favoriteImageUrl}')"></button>
  </div>

  </li>`;
};
