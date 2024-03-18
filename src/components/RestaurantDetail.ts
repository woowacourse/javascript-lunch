import displayCategoryIcon from '../utils/displayCategoryIcon';
import favoriteLinedIcon from '../assets/favorite-icon-lined.png';
import favoriteFilledIcon from '../assets/favorite-icon-filled.png';
const RestaurantDetail = (detail: IRestaurant) => {
  return `
      <div class="restaurant-detail-content">
        <div class="restaurant-detail-icon-favorite-wrapper">
          <div class="detail-category-wrapper">${displayCategoryIcon(detail.category)}</div>
          <img src=${
            detail.favorite ? favoriteFilledIcon : favoriteLinedIcon
          } alt="즐겨찾기" class="detail-favorite-icon" />
        </div>
        <p class="detail-restaurant-name text-subtitle">${detail.name}</p>
        <p class="text-body detail-restaurant-distance">캠퍼스부터 ${detail.distance}분 내</p>
        <p class="text-body detail-restaurant-discription">${detail.description}</p>
        <p class="detail-restaurant-reference">${detail.reference}</p>
      </div>
      <div class="restaurant-detail-button button-container">
        <button class="button button--secondary restaurant-delete">삭제하기</button>
        <button class="button button--primary">닫기</button>
      </div>
  `;
};

export default RestaurantDetail;
