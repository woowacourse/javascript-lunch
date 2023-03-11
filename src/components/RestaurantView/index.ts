import { findRestaurantById } from "../../domain/restaurant";
import findImage from "../../tools/findImage";
import IRestaurant from "../../type/IRestaurant";
import { CategoryImage } from "../CategoryImage";
import {
  onClickCancelButton,
  onClickDeleteButton,
} from "./handleRestaurantView";

class RestaurantView extends HTMLElement {
  restaurant: IRestaurant | undefined;

  constructor() {
    super();
    const restaurantId = this.getAttribute("restaurant-id");
    this.restaurant = findRestaurantById(restaurantId as string);
    this.render();
    onClickCancelButton();
    onClickDeleteButton(this.restaurant?.id as string);
  }
  render() {
    this.innerHTML = `
    <div>
      <div class="d-flex justify-content-between mb-1">
        <div class="restaurant__category">
          <img
          ${CategoryImage(this.restaurant?.category as string)}
        </div>
        <div>
          <favorite-button
            class="favorite-button-${this.restaurant?.id}"
            restaurant-id="${this.restaurant?.id}" 
            data-favorite="${this.restaurant?.favorite}">
          </favorite-button>
        </div>
      </div>
      <div>
        <div>
          <h3 class="restaurant__name text-subtitle">
            ${this.restaurant?.name}
          </h3>
        </div>
        <div class="mb-1">
          <span class="restaurant__distance text-body" >
            캠퍼스부터 ${this.restaurant?.distance}분 내
          </span>
        </div>
      </div>
      <div class="mb-1">
        <p>
          ${this.restaurant?.description}
        </p>
      </div>
      <div class="mb-1">
        <a href="${this.restaurant?.link}" target="_blank">
        ${this.restaurant?.link ?? ""}
        </a>
      </div>
      <div class="button-container">
        <button id="deleteButton" type="button" class="button button--secondary text-caption">삭제하기</button>
        <button id="cancelButton" type="button" class="button button--primary text-caption">닫기</button>
      </div>
    </div>
    `;
  }
}

export default RestaurantView;
