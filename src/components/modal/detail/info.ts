import {
  getCategoryImage,
  getLikeImage,
} from "../../../constants/categoryImage";
import { Restaurant } from "../../../types/restaurant";

export class Info extends HTMLDivElement {
  constructor() {
    super();

    this.init();
  }

  init() {
    this.innerHTML = `
      <div class="image-container">
          <div class="restaurant__category">
              <img class="detail-category-image" />
          </div>
          <img class="detail-like-image" style="cursor: pointer;"/>
      </div>
      <div>
          <h3></h3>
          <span class="restaurant__distance text-body"></span>
      </div>
      <div class="text-body detail-text"></div>
      <a class="restaurant__description detail-link" style="margin-bottom: 10px;"></a>
    `;
  }

  renderContent(restaurant: Restaurant) {
    this.id = restaurant.id;

    (
      this.querySelector(".detail-category-image") as HTMLImageElement
    ).src = `${getCategoryImage(restaurant.category)}`;

    (
      this.querySelector(".detail-like-image") as HTMLImageElement
    ).src = `${getLikeImage(restaurant.like)}`;

    (
      this.querySelector("h3") as HTMLHeadingElement
    ).innerText = `${restaurant.name}`;

    (
      this.querySelector(".restaurant__distance") as HTMLSpanElement
    ).innerText = `캠퍼스부터 ${restaurant.distance}분 내`;

    (
      this.querySelector(".detail-text") as HTMLDivElement
    ).innerText = `${restaurant.description}`;

    (
      this.querySelector(".detail-link") as HTMLAnchorElement
    ).innerText = `${restaurant.link}`;
    (
      this.querySelector(".detail-link") as HTMLAnchorElement
    ).href = `${restaurant.link}`;
  }

  getId() {
    return this.id;
  }
}

export const createDetailInfo = () => {
  customElements.define("detail-info", Info, { extends: "div" });
};
