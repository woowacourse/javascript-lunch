import {
  getCategoryImage,
  getLikeImage,
} from "../../../constants/categoryImage";
import { Restaurant } from "../../../types/restaurant";

export class Info extends HTMLDivElement {
  constructor() {
    super();
  }

  render(restaurant: Restaurant) {
    this.innerHTML = `
        <div class="image-container">
            <div class="restaurant__category">
                <img src="${getCategoryImage(restaurant.category)}" />
            </div>
            <img src="${getLikeImage(
              restaurant.like
            )}" class="detail-like-image" />
        </div>
        <div>
            <h3>${restaurant.name}</h3>
            <span class="restaurant__distance text-body">
                캠퍼스부터 ${restaurant.distance}분 내
            </span>
        </div>
        <div class="text-body detail-text">
            ${restaurant.description}
        </div>
        <a 
            href="${restaurant.link}" 
            class=".restaurant__description"
            style="margin-bottom: 10px;"
        >
            ${restaurant.link}
        </a>
    `;
  }
}

export const createDetailInfo = () => {
  customElements.define("detail-info", Info, { extends: "div" });
};
