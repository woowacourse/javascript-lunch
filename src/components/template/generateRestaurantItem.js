import FavoriteButton from '../FavoriteButton';
import { convertNameToId } from '../../utils/nameConverter';
import ICON from '../../icons';

const createFavoriteButtonInstance = (restaurantsInstance, name, isFavorite) => {
  return new FavoriteButton({
    targetId: `restaurant-list`,
    restaurantsInstance,
    name: convertNameToId(name),
    isFavorite: isFavorite,
  });
};

const generateRestaurantItem = ({ restaurantsInstance, restaurant }) => {
  const { category, name, walkingTimeFromCampus, description, link, isFavorite } = restaurant;
  const favoriteButtonInstance = createFavoriteButtonInstance(
    restaurantsInstance,
    name,
    isFavorite,
  );

  return `
    <li class="restaurant" id="${convertNameToId(name)}">
      <div class="restaurant__category">
        <img src="${ICON[category]}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info" id="info-${convertNameToId(name)}">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${walkingTimeFromCampus}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
        <div><a href="${link}">${link}</a></div>
      </div>
      ${favoriteButtonInstance.render()}
    </li>
  `;
};

export default generateRestaurantItem;
