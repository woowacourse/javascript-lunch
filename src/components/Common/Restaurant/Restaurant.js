import ICON from '../../../icons';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { FAVORITE_ICON } from '../../../constants/rules';

const Restaurant = ({ category, name, walkingTimeFromCampus, description, favorite }) => {
  const li = document.createElement('li');

  li.classList.add('restaurant');

  li.setAttribute('id', name);

  li.innerHTML = `
    <div class="restaurant__category">
      <img src="${ICON[category]}" alt="${category}" class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${walkingTimeFromCampus}분 내</span>
      <p class="restaurant__description text-body">${description}</p>
    </div>
    `;

  li.insertAdjacentElement(
    'beforeend',
    FavoriteButton(name, favorite ? FAVORITE_ICON.add : FAVORITE_ICON.remove),
  );

  return li;
};

export default Restaurant;
