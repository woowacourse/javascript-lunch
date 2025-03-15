// RestaurantModalContent.js
import { FAV_STAR, IMAGE } from '../constants/constants.ts';
import createFavoriteStar from './FavoriteStar.js';
import createRestaurantItem from './RestaurantItem.js';

function createModalContent({ id, category, name, distance, description, image, isFavorite, link }) {
  return `
    <div class="modal-header restaurant__detail">
      ${createRestaurantItem({ id, category, name, distance, description, image, link, isFavorite })}
    </div>
  `;
}

export default createModalContent;
