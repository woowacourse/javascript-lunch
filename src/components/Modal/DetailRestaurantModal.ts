import { CATEGORY_CONVERTER } from '../../constant/constants';
import { Restaurant } from '../../interface/RestaurantInterfaces';
import Button from '../Common/Button';
import FavoriteButton from '../Common/FavoriteButton';

const DetailRestaurantModal = (restaurant: Restaurant) => {
  return /* html */ `
  <div class="detail-restaurant" id=${restaurant.id}>
    <div class="detail-restaurant__image">
      <div class="restaurant__category">
        <img src="./category-${CATEGORY_CONVERTER[restaurant.category]}.png" alt=${restaurant.category} class="category-icon" />
      </div>
      <div>${FavoriteButton(restaurant.favorite)}</div>
    </div>
    
    <h3 class="restaurant__name text-title">${restaurant.name}</h3>
    <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
    <p class="restaurant__description text-body">${restaurant.description}</p>
    <a href=${restaurant.link} class="restaurant__link text-body">${restaurant.link}</a>

    <div class="button-container">
      ${Button('button', 'secondary', '삭제하기')}
      ${Button('button', 'primary', '닫기')}
    </div>
  </div>
  `;
};

export default DetailRestaurantModal;
