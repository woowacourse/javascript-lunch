import { CATEGORY_IMG } from "../constants";
import { $ } from "../utils/Dom";
import favoriteFilled from "../assets/favorite-icon-filled.png";
import favoriteLined from "../assets/favorite-icon-lined.png";

class RestaurantModal {
  #template = ({
    category,
    name,
    distance,
    description,
    link,
    id,
    favorite,
  } = restaurantInfo) => `
    <div class="restaurant-detail modal-backdrop"></div>
    <div class="restaurant-detail modal-container">
      <section class="detail-modal__info">
        <div class="detail-modal__text"> 
        <!-- 카테고리 -->
          <div class="restaurant__category detail-category">
              <img src="${
                CATEGORY_IMG[category]
              }" alt="${category}" class="category-icon">
          </div>
          <!-- 음식점 정보 -->
          <div class="name">
            <h3 class="restaurant__name text-subtitle detail-name">${name}</h3>
          </div>
          <div class="distance">
            <span class="restaurant__distance text-body detail-distance">캠퍼스로부터 ${distance}분 내</span>
          </div>
          <!-- 설명 -->
          <div class="description detail-description">
              <p class="restaurant__description text-body">${description}</p>
          </div>
          <div class="link detail-link">
            <a href="https://${link}">${link}</a>
          </div>
        </div>        
        ${
          favorite
            ? `<img class="modal-favorite" id="${id}" src="${favoriteFilled}" alt="favorite active">`
            : `<img class="modal-favorite" id="${id}" src="${favoriteLined}" alt="favorite">`
        }
      </section>
      <!-- 삭제/닫기 버튼 -->
      <div class="button-container">
          <button type="button" class="button remove-button button--secondary text-caption">삭제하기</button>
          <button class="button close-button button--primary text-caption">닫기</button>
      </div>
  </div>
    `;
  constructor(restaurantInfo) {
    this.restaurantInfo = restaurantInfo;
    this.render(this.restaurantInfo);
    this.showModal();
    this.modal = $(".restaurant-detail.modal-container");
    this.modalBackdrop = $(".restaurant-detail.modal-backdrop");
    this.addEvent();
  }

  render() {
    document.body.insertAdjacentHTML(
      "beforeend",
      this.#template(this.restaurantInfo)
    );
  }

  showModal() {
    $(".restaurant-detail.modal-container").style.display = "block";
    $(".restaurant-detail.modal-backdrop").style.display = "block";
  }

  isVisibleModal() {
    return this.modal.style.display === "block";
  }

  closeModal = () => {
    this.modal.remove();
    this.modalBackdrop.remove();
  };

  closeEscape = (event) => {
    if (!this.isVisibleModal()) return;
    if (event.key !== "Escape") return;
    this.closeModal();
  };

  closeBackDrop = () => {
    if (!this.isVisibleModal()) return;
    this.closeModal();
  };

  addEvent() {
    $(".close-button").addEventListener("click", this.closeModal);
    this.modalBackdrop.addEventListener("click", this.closeBackDrop);
    window.addEventListener("keyup", this.closeEscape);
  }
}

export default RestaurantModal;
