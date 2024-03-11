import {
  categoryAsian,
  categoryChinese,
  categoryEtc,
  categoryJapanese,
  categoryKorean,
  categoryWestern,
} from "../assets/index.js";
import BaseComponent from "./BaseComponent.js";

class RestaurantItem extends BaseComponent {
  #categoryToImg(category) {
    switch (category) {
      case "한식":
        return categoryKorean;
      case "중식":
        return categoryChinese;
      case "아시안":
        return categoryAsian;
      case "일식":
        return categoryJapanese;
      case "양식":
        return categoryWestern;
      case "기타":
        return categoryEtc;
      default:
        break;
    }
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
            <img src=${img} alt=${category} class="category-icon">
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
