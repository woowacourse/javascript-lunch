import Component from '../Component';
import { FAVORITE, RESTAURANT_IMAGE } from '../constants/images';
import { geid, qs } from '../utils/domHelpers';

export default class DetailModal extends Component {
  constructor($target) {
    super($target);

    this.detailRestaurant.subscribe(this.render.bind(this));

    this.addEvent('click', (event) => {
      this.test(event);
    });
  }

  template(
    {
      category,
      storeName,
      distance,
      detail,
      link,
      starShape,
    } = this.detailRestaurant.getRestaurantDetail()
  ) {
    return `
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <div class="detail-modal-image-container">
        <div class="restaurant__category">
          <img src="${RESTAURANT_IMAGE[category]}" alt="${category}" class="category-icon" />
        </div>
        <div class="favorite__shape">
          <img src="${FAVORITE[starShape]}" alt="${starShape}" />
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
        <a href="https://${link}" target="_blank">음식점 자세하게 알아보기</a>
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

  test(event) {
    if (event.target.id === 'cancel-detail-modal-button') {
      this.closeDetailModal();
    }
    if (event.target.id === 'delete-detail-modal-button') {
    }
  }

  deleteRestaurantList() {}

  closeDetailModal() {
    qs('.detail-modal').classList.remove('modal--open');
  }
}
