import { RestaurantCategory, IRestaurant } from '../../../types';

type ImgFileName = {
  [key in RestaurantCategory]: string;
};
const imgFileName: ImgFileName = {
  한식: 'category-korean.png',
  중식: 'category-chinese.png',
  일식: 'category-japanese.png',
  아시안: 'category-asian.png',
  양식: 'category-western.png',
  기타: 'category-etc.png',
};

const Restaurant = {
  getTemplate(restaurant: IRestaurant) {
    const { category, name, distance, description, isFavorite } = restaurant;
    const favoriteIconSrc = isFavorite ? 'favorite-icon-filled.png' : 'favorite-icon-lined.png';
    const favoriteIconAlt = isFavorite ? 'favorite-icon-filled' : 'favorite-icon-lined';

    return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="./${imgFileName[category]}" alt="${category}"
        class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
      <div class="restaurant__favorite">
        <img src="./${favoriteIconSrc}" alt="${favoriteIconAlt}" class="favorite-icon"/>
      </div>
    </li>`;
  },
};

export default Restaurant;
