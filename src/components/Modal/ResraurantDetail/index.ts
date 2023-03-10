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

const RestaurantDetail = {
  getTemplate(restaurant: IRestaurant) {
    const { id, category, distance, isFavorite, name, description, link } = restaurant;
    const favoriteIconSrc = isFavorite ? 'favorite-icon-filled.png' : 'favorite-icon-lined.png';
    const favoriteIconAlt = isFavorite ? 'favorite-icon-filled' : 'favorite-icon-lined';

    return `
    <div id='modal-detail-view' class='modal-detail-view' data-listid='${id}'>
      <div class="restaurant__category">
        <img src="./${imgFileName[category]}" alt="${category}" class="category-icon" />
      </div>
      <h2 class="modal-title text-title">${name}</h2>    
      <div class="restaurant__info">    
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
      <a href="${link}" target="_blank" class="restaurant__link">${link}</a>         
      <div class="button-container">
        <button type="button" id="restaurant-delete-button" class="button button--secondary text-caption">
          삭제하기
        </button>
        <button id="modal-close-button" class="button button--primary text-caption">닫기</button>
      </div>
      <div class="restaurant__favorite">
        <img src="./${favoriteIconSrc}" alt="${favoriteIconAlt}" id="detail-favorite-icon" class="favorite-icon"/>
      </div>
    </div>    
    `;
  },
};

export default RestaurantDetail;
