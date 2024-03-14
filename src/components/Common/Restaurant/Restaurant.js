import ICON from '../../../icons';

const Restaurant = ({ category, name, walkingTimeFromCampus, description }) => {
  return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="${ICON[category]}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${walkingTimeFromCampus}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
      <button class="favorite-button">
        <img src="${ICON['즐겨찾기해제']}" alt="${'즐겨찾기해제'}" class="favorite-icon" />
      </button>
    </li>
    `;
};

export default Restaurant;
