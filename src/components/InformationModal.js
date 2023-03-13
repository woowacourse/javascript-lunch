import { FAVORITE } from '../constants/images';

class InformationModal {
  #restaurantImage;

  constructor(restaurantImage) {
    this.#restaurantImage = restaurantImage;
  }

  render({ category, storeName, distance, detail, link, favorite }) {
    return `
    
        <div class="modal-backdrop"></div>
        <div class="modal-container">
        <div class="information-modal-favorite">
        <div class="restaurant__category">
          <img src="${this.#restaurantImage[category]}" alt="${category}" class="category-icon">
        </div>
          ${
            favorite
              ? `<img src="${FAVORITE.FILLED}" alt="채워짐" class="category-filled"/>`
              : `<img src="${FAVORITE.LINED}" alt="비워짐" class="category-lined"/>`
          }
        </div>
        <div class="restaurant__name text-subtitle" id="storeName">${storeName}</div>
        <div class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</div>
        <div class="restaurant__description text-body">${detail === undefined ? '' : detail}</div>
        <a href="${link}" class="restaurant-link">${link === undefined ? '' : link}</a>
        <div class="button-container">
          <button type="button" class="button button--secondary text-caption">삭제하기</button>
          <button class="button button--primary text-caption">닫기</button>
        </div>
        
        </div>
    
      `;
  }
}

export default InformationModal;
