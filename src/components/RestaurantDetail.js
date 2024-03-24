import {
  deleteRestaurant,
  getRestaurantDetail,
} from "../domains/RestaurantDetail";
import { categoryToImg } from "../utils/categoryToImg";
import BaseModal from "./common/BaseModal";

class RestaurantDetail extends BaseModal {
  #restaurantDetail;

  constructor() {
    super();

    this.#initializeDetail();
    this.initEvent();
  }

  render() {
    const { name, category, distance, description, link, isFavorite } =
      this.#restaurantDetail;
    const img = categoryToImg(category);
    this.innerHTML = `
      <base-modal modalId="detail">
        <div class="category-star-box">
          <div class="restaurant__category">
            <img src=${img} alt=${category} class="category-icon" />
          </div>
          <button class="modal-star" aria-label="모달 즐겨찾기 추가 버튼">
            <favorite-toggle
              isFavorite=${isFavorite}
              name="${name}"
            ></favorite-toggle>
          </button>
        </div>

        <div>
          <div>
            <div class="detail-name">${name}</div>
            <div class="detail-distance">캠퍼스로부터 ${distance}분 내</div>
          </div>

          <div></div>
        </div>

        <div class="detail-description">${description}</div>
        <a class="detail-link" href=${link}>${link}</a>

        <div class="button-container">
          <button
            id="delete-button"
            class="button button--secondary text-caption"
          >
            삭제하기
          </button>
          <button id="close-modal" class="button button--primary text-caption">
            닫기
          </button>
        </div>
      </base-modal>
    `;
  }

  #initializeDetail(detail = {}) {
    const defaults = {
      name: "",
      category: "",
      distance: "",
      description: "",
      link: "",
      isFavorite: false,
    };

    this.#restaurantDetail = { ...defaults, ...detail };
  }

  initEvent() {
    this.addEventListener("click", (e) => {
      if (e.target.id === "close-modal") {
        this.modalClose(".detail");
      } else if (e.target.id === "delete-button") {
        if (confirm("정말 삭제하시겠습니까?")) {
          deleteRestaurant(this.#restaurantDetail.name);
          this.modalClose(".detail");
          this.emitEvent("delete-restaurant");
        }
      }
    });
  }

  setEvent() {
    document.addEventListener("detail-modal-open", (e) => {
      this.#initializeDetail(getRestaurantDetail(e.detail.name));
      this.render();
    });
  }
}

customElements.define("restaurant-detail", RestaurantDetail);
