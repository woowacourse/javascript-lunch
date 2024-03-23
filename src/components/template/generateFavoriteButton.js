import ICON from '../../icons';
import { convertNameToId } from '../../utils/nameConverter';

const generateFavoriteButton = (restaurant) => {
  return `
    <button type="button" id="favorite-button" class="favorite-button" data-name="${restaurant.name}"aria-label="자주 가는 음식점 추가">
        <img id="favorite-icon-${convertNameToId(restaurant.name)}" class="favorite-icon" src="${restaurant.isFavorite ? ICON.즐겨찾기추가 : ICON.즐겨찾기해제}" alt="즐겨찾기 버튼" />
    </button>
    `;
};

export default generateFavoriteButton;
