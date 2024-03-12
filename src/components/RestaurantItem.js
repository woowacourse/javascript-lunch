import {
  categoryAsian,
  categoryChinese,
  categoryEtc,
  categoryJapanese,
  categoryKorean,
  categoryWestern,
  defaultImg,
} from "../assets";
import BaseComponent from "./BaseComponent.js";

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

  #categoryToImg(category) {
    return CATEGORY_TO_IMG[category] || defaultImg;
  }

  render() {
    const category = this.getAttribute("category");
    const name = this.getAttribute("name");
    const distance = this.getAttribute("distance");
    const description = this.getAttribute("description");
    const img = this.#categoryToImg(category);

    this.innerHTML = `
    <li class="restaurant">
        <div class="restaurant__category">
            <img src=${img} alt="한식" class="category-icon">
        </div>
        <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            ${
              description
                ? `<p class="restaurant__description text-body">${description}</p>`
                : ""
            }
        </div>
    </li>
    `;
  }
}

customElements.define("restaurant-item", RestaurantItem);
