import {
  deleteRestaurant,
  getRestaurantDetail,
} from "../domains/RestaurantDetail";
import { categoryToImg } from "../utils/categoryToImg";
import { $ } from "../utils/dom";
import BaseComponent from "./common/BaseComponent";
import BaseModal from "./common/BaseModal";

class RestaurantDetail extends BaseModal {
  #restaurantDetail;

  constructor() {
    super();
    this.#restaurantDetail = {
      name: "",
      category: "",
      distance: "",
      description: "",
      link: "",
    };

    this.initEvent();
  }

  render() {
    const { name, category, distance, description, link } =
      this.#restaurantDetail;
    const img = categoryToImg(category);
    this.innerHTML = `
      <base-modal modalId="detail">
        <div class="restaurant__category">
          <img src=${img} alt=${category} class="category-icon" />
        </div>
        <div class="detail-name">${name}</div>

        <div class="detail-distance">캠퍼스로부터 ${distance}분 내</div>
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

  initEvent() {
    // 이벤트 위임을 사용하여 이벤트 리스너를 한 번만 등록
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
      const { name, category, distance, description, link } =
        getRestaurantDetail(e.detail.name);
      this.#restaurantDetail.name = name;
      this.#restaurantDetail.category = category;
      this.#restaurantDetail.distance = distance;
      this.#restaurantDetail.description = description;
      this.#restaurantDetail.link = link || "";
      this.render();
    });
  }
}

customElements.define("restaurant-detail", RestaurantDetail);
