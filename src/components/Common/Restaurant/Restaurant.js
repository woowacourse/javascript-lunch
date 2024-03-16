import ICON from '../../../icons';

// TODO: 즐겨찾기 추가, 해제 상수 분리
const Restaurant = ({ category, name, walkingTimeFromCampus, description, favorite }) => {
  return `
    <li id="${name}" class="restaurant">
      <div class="restaurant__category">
        <img src="${ICON[category]}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${walkingTimeFromCampus}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
      <button class="favorite-button">
        <img src="${favorite ? ICON['즐겨찾기추가'] : ICON['즐겨찾기해제']}" alt="${favorite ? '즐겨찾기추가' : '즐겨찾기해제'}" class="favorite-icon" />
      </button>
    </li>
    `;
};

export default Restaurant;
