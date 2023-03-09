import {
  getCategoryImage,
  getLikeImage,
} from "../../../constants/categoryImage";
import { Restaurant } from "../../../types/restaurant";

export class DetailModal extends HTMLDivElement {
  constructor() {
    super();
  }

  render(restaurant: Restaurant) {
    this.innerHTML = `
        <div class="restaurant-detail-container">
            <div class="image-container">
                <div class="restaurant__category">
                    <img src="${getCategoryImage(restaurant.category)}" />
                </div>
                <img src="${getLikeImage(restaurant.like)}" class="like-icon" />
            </div>
            <div class="">
                <h3 class="">${restaurant.name}</h3>
                <span class="restaurant__distance text-body">
                    캠퍼스부터 ${restaurant.distance}분 내
                </span>
            </div>
            <div class="text-body detail-text">
                ${restaurant.description}
            </div>
            <a href="${restaurant.link}">${restaurant.link}</a>
            <div class="button-container">
                <button class="button button--secondary text-caption">삭제하기</button>
                <button class="button button--primary text-caption">닫기</button>
            </div>
        </div>
    `;
  }
}

export const createModalDetailContent = () => {
  customElements.define("modal-detail", DetailModal, { extends: "div" });
};
