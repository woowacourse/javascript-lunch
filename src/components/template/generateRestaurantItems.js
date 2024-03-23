import generateFavoriteButton from './generateFavoriteButton';
import { convertNameToId } from '../../utils/nameConverter';
import ICON from '../../icons';

export const generateRestaurantItem = (restaurant) => {
  const { category, name, walkingTimeFromCampus, description, link, isFavorite } = restaurant;

  const linkContent = link ? `<div><a href="${link}">${name} 링크</a></div>` : '';

  return `
    <li id="${convertNameToId(name)}" class="restaurant">
      <div class="restaurant__category">
        <img src="${ICON[category]}" alt="${category}" class="category-icon">
      </div>
      <div id="restaurant-info" class="restaurant__info" data-restaurant-name="${name}">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${walkingTimeFromCampus}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
        ${linkContent}
      </div>
      ${generateFavoriteButton(restaurant)}
    </li>
  `;
};

export const generateRestaurantItems = (restaurants) => {
  return restaurants.reduce((restaurantTemplate, restaurant) => {
    return restaurantTemplate + generateRestaurantItem(restaurant);
  }, '');
};
