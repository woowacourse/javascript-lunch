import {
  categoryIconFileName,
  favoriteIconFileName,
  favoriteIconAlt,
} from '../../../constants/imageFileMetadata';

import { Restaurant } from '../../../types';

const RestaurantDetail = {
  getTemplate(restaurant: Restaurant) {
    const { id, category, name, distance, description, link, isFavorite } = restaurant;

    return `
    <div id='modal-detail-view' class='modal-detail-view' data-listid='${id}'>
      <div class="restaurant__category">
        <img src="./${categoryIconFileName[category]}" alt="${category}" class="category-icon" />
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
        <button id="detail-modal-close-button" class="button button--primary text-caption">닫기</button>
      </div>
      <div class="restaurant__favorite">
        <img src="./${favoriteIconFileName[`${isFavorite}`]}"
        alt="${favoriteIconAlt[`${isFavorite}`]}" 
        id="detail-favorite-icon" 
        class="favorite-icon"/>
      </div>
    </div>    
    `;
  },
};

export default RestaurantDetail;
