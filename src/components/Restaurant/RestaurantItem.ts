import { CATEGORY_CONVERTER } from '../../constant/constants';
import { Restaurant } from '../../interface/RestaurantInterfaces';
import FavoriteButton from '../Common/FavoriteButton';

const RestaurantItem = (restaurant: Restaurant) => {
  return /*html*/ `
  <li class="restaurant" id=${restaurant.id}>
    <div class="restaurant__category">
      <img src="./category-${CATEGORY_CONVERTER[restaurant.category]}.svg" alt=${restaurant.category} class="category-icon" />
    </div>
    <div class="restaurant__info">   
      <div class="restaurant__sub-info">
        <div>
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
        </div>
        <div>${FavoriteButton(restaurant.favorite)}</div>
      </div>
      <p class="restaurant__description text-body">${restaurant.description}</p>
    </div>
  </li>
  `;
};

export default RestaurantItem;
