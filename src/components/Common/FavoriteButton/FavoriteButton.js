import ICON from '../../../icons';

export const FavoriteButton = (id, favoriteState) => {
  return /* html */ `
    <button id="${id}" class="favorite-button">
      <img class="favorite-icon" src="${ICON[favoriteState]}" alt="${favoriteState}" />
    </button>
  `;
};
