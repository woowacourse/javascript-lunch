import { CATEGORY_CONVERTER } from '../../constant/constants';
import { Restaurant } from '../../interface/RestaurantInterfaces';
import FavoriteButton from '../Common/FavoriteButton';

const RestaurantItem = (restaurant: Restaurant, index: number) => {
  return /*html*/ `
  <li class="restaurant" id=${index}>
    <div class="restaurant__category">
      <img src="./category-${CATEGORY_CONVERTER[restaurant.category]}.png" alt=${restaurant.category} class="category-icon" />
    </div>
    <div class="restaurant__info">   
      <div>
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
        ${FavoriteButton(restaurant.favorite, index)}
      </div>
      <p class="restaurant__description text-body">${restaurant.description}</p>
    </div>
  </li>
  `;
};

export default RestaurantItem;
