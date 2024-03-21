import { FAVORITE_ICON } from '../../../constants/rules';
import ICON from '../../../icons';

const handleClickFavoriteButton = (event) => {
  const iconImg = event.target.closest('img');

  iconImg.src === ICON[FAVORITE_ICON.add]
    ? (iconImg.src = ICON[FAVORITE_ICON.remove])
    : (iconImg.src = ICON[FAVORITE_ICON.add]);
  iconImg.alt === FAVORITE_ICON.add
    ? (iconImg.alt = FAVORITE_ICON.remove)
    : (iconImg.alt = FAVORITE_ICON.add);
};

export const FavoriteButton = (id, favoriteState) => {
  const button = document.createElement('button');
  const img = document.createElement('img');

  button.classList.add('favorite-button');
  img.classList.add('favorite-icon');

  button.setAttribute('id', id);

  img.setAttribute('alt', favoriteState);
  img.setAttribute('src', ICON[favoriteState]);

  button.appendChild(img);

  button.addEventListener('click', (event) => handleClickFavoriteButton(event));

  return button;
};
