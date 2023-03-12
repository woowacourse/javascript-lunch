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
      detail,
      link,
      starShape,
    } = this.detailRestaurant.getRestaurantDetail()
  ) {
    this.starShape = starShape;
    this.details = {
      category: category,
      storeName: storeName,
      distance: distance,
      detail: detail || '',
      link: link || '',
      starShape: starShape,
    };

    console.log('render');

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
      this.deleteRestaurantList(event);
    }
    if (event.target.className === 'favorite-icon') {
      this.switchFavorite(event);
    }
  }

  closeDetailModal() {
    qs('.detail-modal').classList.remove('modal--open');
  }

  deleteRestaurantList(event) {
    const deleteStoreName = event.currentTarget.textContent
      .split('\n')
      .map((text) => text.trim())
      .filter((text) => text.length !== 0)[0];

    this.restaurantManager.removeRestaurnat(deleteStoreName);
    this.favoriteRestaurant.removeRestaurant(deleteStoreName);

    this.closeDetailModal();
  }

  switchFavorite(event) {
    if (this.starShape === 'lined') {
      this.starShape = 'filled';

      this.addRestaurantList(event);
    } else if (this.starShape === 'filled') {
      this.starShape = 'lined';

      this.removeRestaurantList(event);
    }
  }

  addRestaurantList(event) {
    const favoriteTexts = event.currentTarget.textContent
      .split('\n')
      .map((text) => text.trim())
      .filter((text) => text.length !== 0);

    const category = event.currentTarget.children[1].children[0].children[0].children[0].alt;

    const addFavoriteData = {
      category: category,
      storeName: favoriteTexts[0],
      distance: favoriteTexts[1].match(/\d+/).join(''),
      detail: favoriteTexts[2] || '',
      link: favoriteTexts[3] || '',
      starShape: 'filled',
    };

    this.details = addFavoriteData;

    this.restaurantManager.fillRestaurantStarShape(favoriteTexts[0]);
    this.favoriteRestaurant.addRestaurant(addFavoriteData);
    this.detailRestaurant.setRestaurantDetail(this.details);
  }

  removeRestaurantList(event) {
    const favoriteTexts = event.currentTarget.textContent
      .split('\n')
      .filter((text) => text.trim().length !== 0)
      .map((restaurantText) => restaurantText.trim());

    const storeName = favoriteTexts[0];
    this.details.starShape = 'lined';

    this.restaurantManager.unfillRestaurantStarShape(storeName);
    this.favoriteRestaurant.removeRestaurant(storeName);
    this.detailRestaurant.setRestaurantDetail(this.details);
  }
}
