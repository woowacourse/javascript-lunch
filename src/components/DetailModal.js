import Component from '../Component';
import { FAVORITE, RESTAURANT_IMAGE } from '../constants/images';
import { geid, qs } from '../utils/domHelpers';

export default class DetailModal extends Component {
  details;

  constructor($target) {
    super($target);

    this.detailRestaurant.subscribe(this.render.bind(this));

    this.addEvent('click', (event) => {
      this.switchEvent(event);
    });
  }

  template(
    {
      category,
      storeName,
      distance,
      detail = '',
      link = '',
      starShape,
    } = this.detailRestaurant.getRestaurantDetail()
  ) {
    this.details = {
      category,
      storeName,
      distance,
      detail,
      link,
      starShape,
    };

    return `
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <div class="detail-modal-image-container">
        <div class="restaurant__category">
          <img src="${RESTAURANT_IMAGE[category]}" alt="${category}" class="category-icon" />
        </div>
        <div class="favorite__shape">
          <img src="${FAVORITE[starShape]}" alt="${starShape}" class="favorite-icon" />
        </div>
      </div>
      <div class="detail-modal-header">
        <h3 class="detail-modal-title text-title">${storeName}</h3>
      </div>

      <!-- 거리 -->
      <div class="detail-form-item">
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
      </div>

      <!-- 설명 -->
      <div class="detail-form-item">
        <p>${detail}</p>
      </div>

      <!-- 링크 -->
      <div class="detail-form-item">
        <a href="${link}" target="_blank">${link}</a>
      </div>

      <!-- 취소/추가 버튼 -->
      <div class="button-container">
        <button id="delete-detail-modal-button" class="button button--secondary text-caption">삭제하기</button>
        <button
          type="button"
          id="cancel-detail-modal-button"
          class="button button--primary text-caption"
        >
          닫기
        </button>
      </div>
    </div>
      `;
  }

  switchEvent(event) {
    if (event.target.id === 'cancel-detail-modal-button') {
      this.closeDetailModal();
    }
    if (event.target.id === 'delete-detail-modal-button') {
      this.deleteRestaurantList();
    }
    if (event.target.className === 'favorite-icon') {
      this.switchFavorite();
    }
  }

  closeDetailModal() {
    qs('.detail-modal').classList.remove('modal--open');
  }

  deleteRestaurantList() {
    this.restaurantManager.removeRestaurnat(this.details.storeName);
    this.favoriteRestaurant.removeRestaurant(this.details.storeName);

    this.closeDetailModal();
  }

  switchFavorite() {
    if (this.details.starShape === 'lined') {
      this.addRestaurantList();
    } else if (this.details.starShape === 'filled') {
      this.removeRestaurantList();
    }
  }

  addRestaurantList() {
    this.details.starShape = 'filled';

    this.restaurantManager.fillRestaurantStarShape(this.details.storeName);
    this.favoriteRestaurant.addRestaurant(this.details);
    this.detailRestaurant.setRestaurantDetail(this.details);
  }

  removeRestaurantList() {
    this.details.starShape = 'lined';

    this.restaurantManager.unfillRestaurantStarShape(this.details.storeName);
    this.favoriteRestaurant.removeRestaurant(this.details.storeName);
    this.detailRestaurant.setRestaurantDetail(this.details);
  }
}
