import { favoriteIconFilled, favoriteIconLined } from "../assets";
import Controller from "../domain/Controller";
import RestaurantType from "../type/Restaurant";
import { closeBottomSheet, findImage } from "../utils";
import TabBar from "./TabBar";

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
          <button id="deleteButton" type="button" class="button button--secondary text-caption">삭제하기</button>
          <button id="closeButton" type="submit" class="button button--primary text-caption">닫기</button>
        </div>
      </div>
    `;
    this.onClickCloseButton();
    this.onClickDeleteButton();
    this.onToggleFavorite();
  }

  onClickCloseButton() {
    const closeButton = this.querySelector("#closeButton");
    if (!(closeButton instanceof HTMLElement)) {
      return;
    }

    closeButton.addEventListener("click", () => {
      closeBottomSheet();
      if (TabBar.getCurrentTab() === "favorite") {
        this.controller.setFavoriteRestaurantList();
        return;
      }
      this.controller.renderRestaurantList();
    });
  }

  onClickDeleteButton() {
    const deleteButton = this.querySelector("#deleteButton");
    if (!(deleteButton instanceof HTMLElement)) {
      return;
    }

    deleteButton?.addEventListener("click", () => {
      this.controller.deleteRestaurant();
      closeBottomSheet();
      if (TabBar.getCurrentTab() === "favorite") {
        this.controller.setFavoriteRestaurantList();
        return;
      }
      this.controller.loadLocalStorage();
      this.controller.renderRestaurantList();
    });
  }

  onToggleFavorite() {
    const favorite = this.querySelector("#favorite");
    if (!(favorite instanceof HTMLElement)) {
      return;
    }

    favorite.addEventListener("click", () => {
      if (TabBar.getCurrentTab() === "favorite") {
        this.controller.toggleFavorite();
        this.render(this.controller.getSelectedRestaurant());
        return;
      }
      this.controller.toggleFavorite();
      this.render(this.controller.getSelectedRestaurant());
    });
  }
}
export default RestaurantDetail;
