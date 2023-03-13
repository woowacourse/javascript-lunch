import {
  categoryIconFileName,
  favoriteIconFileName,
  favoriteIconAlt,
} from '../../../constants/imageFileMetadata';

import { Restaurant } from '../../../types';

const Restaurant = {
  getTemplate(restaurant: Restaurant) {
    const { id, category, name, distance, description, isFavorite } = restaurant;

    return `  
    <li id="restaurant" class="restaurant" data-listid=${id} >
      <div class="restaurant__category">
        <img src="./${categoryIconFileName[category]}" alt="${category}"
        class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
      <div class="restaurant__favorite">
        <img src="./${favoriteIconFileName[`${isFavorite}`]}"
        alt="${favoriteIconAlt[`${isFavorite}`]}"  
        id="favorite-icon" 
        class="favorite-icon"/>
      </div>
    </li>`;
  },
};

export default Restaurant;
