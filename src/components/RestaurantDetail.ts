import { favoriteIconFilled, favoriteIconLined } from "../assets";
import Controller from "../domain/Controller";
import RestaurantType from "../type/Restaurant";
import { findImage } from "../utils";
class RestaurantDetail extends HTMLElement {
  private controller;
  constructor() {
    super();
    this.controller = Controller.getInstance();
    this.render(this.controller.getSelectedRestaurant());
  }
  render(restaurant: RestaurantType) {
    this.innerHTML = `
      <div>
      <div class="icon-container">
      
      <div class="restaurant__category">
        <img src="${findImage(restaurant.category)}" alt="${
      restaurant.category
    }" class="category-icon">
  </div>
  <img id="favorite" src="${
    restaurant.isFavorite ? favoriteIconFilled : favoriteIconLined
  }" alt="favorite">
      </div>
        <div id="restaurantInfo" class="info-container">
          <h3 class="restaurant__detail__name text-subtitle">${
            restaurant.name
          }</h3>
          <span class="restaurant__detail__distance text-body">캠퍼스부터 ${
            restaurant.distance
          }분 내</span>
          <p class="restaurant__detail__description text-body">${
            restaurant.description
          }</p>
          <a href="${restaurant.link}" class="restaurant__link text-body">${
      restaurant.link
    }</a>
        </div>
        <div class="button-container">
          <button id="cancelButton" type="button" class="button button--secondary text-caption">삭제하기</button>
          <button type="submit" class="button button--primary text-caption">닫기</button>
        </div>
      </div>
    `;
  }
}
export default RestaurantDetail;
