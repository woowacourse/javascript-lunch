import { CATEGORY } from "../constants";
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
        <!-- 카테고리 -->
        <div class="restaurant__category">
            <img src="${
              CATEGORY[category]
            }" alt="${category}" class="category-icon">
        </div>
        <!-- 음식점 정보 -->
        <div class="name">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스로부터 ${distance}분 내</span>
        </div>
        ${
          favorite
            ? `<img src="${favoriteFilled}" alt="">`
            : `<img src="${favoriteLined}" alt="">`
        }
        <!-- 설명 -->
        <div class="description">
            <p class="restaurant__description text-body">${description}</p>
        </div>
        <div class="link">
          <a href="https://${link}">링크</a>
        </div>
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
    $(".remove-button").addEventListener("click", (event) => {
      $(".remove-button");
      this.closeModal();
    });
    $(".close-button").addEventListener("click", this.closeModal);
    this.modalBackdrop.addEventListener("click", this.closeBackDrop);
    window.addEventListener("keyup", this.closeEscape);
  }

  removeRestaurant() {}
}

export default RestaurantModal;
