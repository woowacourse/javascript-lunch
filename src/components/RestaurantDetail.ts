import displayCategoryIcon from '../utils/displayCategoryIcon';
import favoriteLinedIcon from '../assets/favorite-icon-lined.png';
import favoriteFilledIcon from '../assets/favorite-icon-filled.png';
const RestaurantDetail = (detail: IRestaurant) => {
  return `
      <div class="restaurant-detail-content">
        <div class="restaurant-detail-icon-favorite-wrapper">
          ${displayCategoryIcon(detail.category)}
          <img src=${detail.favorite ? favoriteFilledIcon : favoriteLinedIcon} alt="즐겨찾기" class="favorite-icon" />
        </div>
        <p>캠퍼스부터 ${detail.distance}분 내</p>
        <p>${detail.description}</p>
        <p>${detail.reference}</p>
      </div>
      <div class="restaurant-detail-button">
        <button>삭제하기</button>
        <button>닫기</button>
      </div>
  `;
};

export default RestaurantDetail;
