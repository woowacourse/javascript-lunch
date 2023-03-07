import { RestaurantCategory, IRestaurant } from '../../../types';

type ImgFileName = {
  [key in RestaurantCategory]: string;
};
const imgFileName: ImgFileName = {
  한식: 'category-korean',
  중식: 'category-chinese',
  일식: 'category-japanese',
  아시안: 'category-asian',
  양식: 'category-western',
  기타: 'category-etc',
};

const Restaurant = {
  getTemplate(restaurant: IRestaurant) {
    return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="./${imgFileName[restaurant.category]}.png" alt="${restaurant.category}"
        class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
        <p class="restaurant__description text-body">${restaurant.description}</p>
      </div>
    </li>`;
  },
};

export default Restaurant;
