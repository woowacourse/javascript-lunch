import {
  getStoredRestaurantData,
  setStoredRestaurantData,
} from "../../domain/storeRestaurantData.js";
import { filterRestaurants } from "../../domain/filterRestaurants.js";
import Modal from "./Modal.js";

class ModalDetail extends Modal {
  template() {
    const { name, distance, description, imgSrc, imgAlt, like, link } =
      this.props.data;
    const starImg = like ? "/filledStar.png" : "/unFilledStar.png";

    return `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <div class="modal-wrapper">
            <div class="restaurant__category">
                <img src=${imgSrc} alt=${imgAlt} class="category-icon"/>
            </div>
            <img src="${starImg}" id="modal__star" class="restaurant__like"/>
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
            <a href="${link}" class="restaurant__link text-body">${name} 홈페이지</a>
          </div>
          <div class="button-container">
            <button id="delete_button" type="button" class="button button--secondary text-caption">삭제하기</button>
            <button id="close_button" class="button button--primary text-caption">닫기</button>
          </div>
        </div>
      `;
  }

  setEvent() {
    this.$target
      .querySelector(".modal-backdrop")
      ?.addEventListener("click", () => this.handleModalClose());
    this.$target
      .querySelector("#close_button")
      ?.addEventListener("click", () => this.handleModalClose());
    this.$target
      .querySelector("#delete_button")
      ?.addEventListener("click", () => this.handleDeleteRestaurant());
    this.$target
      .querySelector("#modal__star")
      ?.addEventListener("click", () => this.handleLikeToggle());
  }

  handleLikeToggle() {
    this.props.data.like = !this.props.data.like;
    updateStoredData();
    updateLikeUI();
  }

  updateStoredData() {
    let storedData = getStoredRestaurantData();
    storedData = storedData.map((restaurant) =>
      restaurant.name === this.props.data.name
        ? { ...restaurant, like: this.props.data.like }
        : restaurant,
    );
    setStoredRestaurantData(storedData);
  }

  updateLikeUI() {
    const starImg = this.props.data.like
      ? "/filledStar.png"
      : "/unFilledStar.png";
    this.$target.querySelector("#modal__star").src = starImg;
    document.querySelectorAll(".restaurant").forEach((item) => {
      if (
        item.querySelector(".restaurant__name")?.innerText ===
        this.props.data.name
      ) {
        item.querySelector(".list__star").src = starImg;
      }
    });
  }

  handleDeleteRestaurant() {
    let updatedData = getStoredRestaurantData().filter(
      (restaurant) => restaurant.name !== this.props.data.name,
    );
    setStoredRestaurantData(updatedData);

    const currentCategory = localStorage.getItem("selectedCategory") || "전체";
    const currentSort = localStorage.getItem("sortType") || "name";
    filterRestaurants(currentCategory, currentSort);

    this.handleModalClose();
  }
}
export default ModalDetail;
