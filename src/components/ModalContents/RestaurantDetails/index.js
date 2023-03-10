import { $ } from '../../../utils';
import Modal from '../../Modal';
import './index.css';
import categoryKorean from '../../../assets/category-korean.png';
import categoryChinese from '../../../assets/category-chinese.png';
import categoryJapanese from '../../../assets/category-japanese.png';
import categoryWestern from '../../../assets/category-western.png';
import categoryAsian from '../../../assets/category-asian.png';
import categoryEtc from '../../../assets/category-etc.png';
import favoriteIcon from '../../../assets/favorite-icon-filled.png';
import notFavoriteIcon from '../../../assets/favorite-icon-lined.png';

const CATEGORY_IMAGES = {
  한식: categoryKorean,
  중식: categoryChinese,
  일식: categoryJapanese,
  양식: categoryWestern,
  아시안: categoryAsian,
  기타: categoryEtc,
};

const FAVORITE_IMAGES = {
  true: favoriteIcon,
  false: notFavoriteIcon,
};

class RestaurantDetails extends HTMLElement {
  connectedCallback() {}

  render(restaurantInfo) {
    const { id, category, name, distance, description, link, isFavorite } =
      restaurantInfo;
    this.innerHTML = `
      <div id="restaurantDetails" class="modal-container-info">
        <div id=${id} class="restaurant-info">
          <div class="restaurant__category-info">
            <img src="${CATEGORY_IMAGES[category]}" alt=${category} class="category-icon-info">
          </div>
          <img src="${FAVORITE_IMAGES[isFavorite]}" alt=${isFavorite} class="favorite-icon-info">
          <div class="restaurant__info-info">
          <h3 class="restaurant__name-info text-subtitle">${name}</h3>
          <span class="restaurant__distance-info text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description-info text-body">${description}</p>
          <a href="${link}" target="_blank" class="restaurant__link-info text-body">${link}</a>
          </div>
        </div>
        <div class="button-container">
          <lunch-button type="click" name="삭제하기" id="deleteContent" color="white"></lunch-button>
          <lunch-button type="click" name="닫기" id="cancelModal" color="orange"></lunch-button>
        </div>
      </div>
    `;

    this.modalHandler();
  }

  modalHandler() {
    $('#cancelModal').addEventListener('click', this.closeModal);
  }

  closeModal() {
    new Modal().closeModal();
  }
}

export default RestaurantDetails;
