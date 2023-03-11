import favoriteIcon from './favoriteIcon';
import { CATEGORY_IMAGE_URL } from '../constants';

const restaurantListItem = ({ restaurant }) => {
  const { id, category, name, takeMinute, description, favorite } = restaurant;
  return `
    <li data-id="${id}" class="restaurant">
      <div class="restaurant__category">
        <img src="${CATEGORY_IMAGE_URL[category]}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${takeMinute}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
      ${favoriteIcon({ id, favorite })}
    </li>
  `;
};

export default restaurantListItem;
