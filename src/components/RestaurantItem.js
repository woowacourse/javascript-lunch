import {
  categoryAsian,
  categoryChinese,
  categoryEtc,
  categoryJapanese,
  categoryKorean,
  categoryWestern,
} from "../assets";
import { categoryToImg } from "../utils/categoryToImg";

import BaseComponent from "./common/BaseComponent.js";

export const CATEGORY_TO_IMG = {
  한식: categoryKorean,
  중식: categoryChinese,
  아시안: categoryAsian,
  일식: categoryJapanese,
  양식: categoryWestern,
  기타: categoryEtc,
};

class RestaurantItem extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    const category = this.getAttribute("category");
    const name = this.getAttribute("name");
    const distance = this.getAttribute("distance");
    const description = this.getAttribute("description");
    const img = categoryToImg(category);
    const isFavorite = this.getAttribute("isFavorite");

    this.innerHTML = `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src=${img} alt=${category} class="category-icon" />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${distance}분 내</span
          >

          ${
            description
              ? `<p class="restaurant__description text-body">${description}</p>`
              : ""
          }
        </div>


        <button class="star" aria-label="즐겨찾기 추가 버튼">
        <favorite-toggle isFavorite=${isFavorite} name="${name}"></favorite-toggle>
        </button>

      </li>
    `;
  }

  setEvent() {
    document.addEventListener("favorite-click", () => {
      this.render();
    });

    this.addEventListener("click", (e) => {
      e.target.closest(".star")
        ? null
        : this.emitEvent("detail-modal-open", {
            name: this.getAttribute("name"),
          });
    });
  }
}

customElements.define("restaurant-item", RestaurantItem);
