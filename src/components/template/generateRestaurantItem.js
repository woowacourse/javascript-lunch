import FavoriteButton from '../FavoriteButton';
import ICON from '../../icons';

const convertNameToId = (name) => name.replace(/\s+/g, '-');

const renderFavoriteButton = (name, isFavorite) => {
  const favoriteButton = new FavoriteButton({
    targetId: `restaurant-list`,
    name,
    isFavorite,
  });
  return favoriteButton.render();
};

// TODO: createElement로 변경, createElement도 재사용할 수 있게 구현
const generateRestaurantItem = ({
  category,
  name,
  walkingTimeFromCampus,
  description,
  isFavorite,
}) => {
  return `
    <li class="restaurant" id="${convertNameToId(name)}">
      <div class="restaurant__category">
        <img src="${ICON[category]}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${walkingTimeFromCampus}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
      ${renderFavoriteButton(convertNameToId(name), isFavorite)}
    </li>
    `;
};

export default generateRestaurantItem;
