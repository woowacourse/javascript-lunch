import { Restaurant } from '../types/types';
import { RESTAURANT_IMAGE } from '../constants/images';

const createRestaurantItem = function (restaurant: Restaurant) {
  return `<li class="restaurant">
  
  <div class="restaurant__category">
    <img src="${RESTAURANT_IMAGE[restaurant.category]}" 
    alt="${restaurant.category}" class="category-icon"/>
  </div>

  <div class="restaurant__info">
    <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
    <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
    <p class="restaurant__description text-body">${restaurant.description ?? ''}</p>
  </div>

  </li>`;
};

export default createRestaurantItem;
