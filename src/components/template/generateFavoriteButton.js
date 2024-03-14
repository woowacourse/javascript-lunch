import ICON from '../../icons';

const generateFavoriteButton = (name, isFavorite) => {
  return `
    <button type="button" id="favorite-button-${name}" class="favorite-button" aria-label="자주 가는 음식점 추가">
        <img src="${isFavorite ? ICON.즐겨찾기추가 : ICON.즐겨찾기해제}" alt="즐겨찾기 버튼" />
    </button>
    `;
};

export default generateFavoriteButton;
