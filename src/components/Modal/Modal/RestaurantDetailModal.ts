import "./RestaurantDetailModal.css";
import { Restaurant } from "../../../../types/restaurant";
import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "../../../constants/constants";
import { clickStar } from "../../StarIcon/star";
export default class RestaurantDetailModal {
  restaurant;
  modalElement;
  closeButton;
  deleteButton;
  updateFavoriteStatus;
  deleteRestaurant;
  boundHandleStarIconClick;

  constructor(
    restaurant: Restaurant,
    updateFavoriteStatus: (name: string) => void,
    deleteRestaurant: (name: string) => void
  ) {
    this.restaurant = restaurant;
    this.modalElement = document.getElementById(
      "restaurant-detail-dialog"
    ) as HTMLDialogElement;
    this.boundHandleStarIconClick = this.handleStarIconClick.bind(this);
    this.addRestaurantDetail();
    this.closeButton = document.querySelector(
      ".detail-close-button"
    ) as HTMLButtonElement;
    this.deleteButton = document.querySelector(
      ".detail-delete-button"
    ) as HTMLButtonElement;
    this.updateFavoriteStatus = updateFavoriteStatus;
    this.deleteRestaurant = deleteRestaurant;
    this.addEventListeners();
  }

  handleStarIconClick(e: MouseEvent) {
    let { name, isFavorite } = this.restaurant;

    const starIcon = (e.target as HTMLElement).closest(
      ".star-icon"
    ) as HTMLImageElement;

    if (starIcon) {
      starIcon.src = !isFavorite ? "images/star.png" : "images/empty-star.png";

      this.restaurant.isFavorite = !isFavorite;
      this.updateFavoriteStatus(name);
      return;
    }
  }

  addRestaurantDetail() {
    let { category, name, distance, description, link, isFavorite } =
      this.restaurant;

    const container = document.querySelector(
      "#detail-modal-container"
    ) as HTMLElement;

    container.addEventListener("click", this.boundHandleStarIconClick);

    const mappedImage =
      IMAGE_SRC_BY_RESTAURANTS_CATEGORY[category] || "images/default.png";
    container.innerHTML = `
          <div class="icon-container">
            <div class="restaurant__category">
              <img class="category-icon" src="${mappedImage}"/>
            </div>
            <div class="favorite">${clickStar(isFavorite)}</div>
          </div>
          <div class="detail-restaurant__info">
            <h3 class="detail-restaurant__name text-title">${name}</h3>
            <span class="detail-restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="detail-restaurant__description text-body">${description}</p>
            <a class="detail-restaurant__link" href="${link}">${link}</a>
          </div>

          <div class="detail-button-box">
            <button type="button" class="button detail-delete-button">
              삭제하기
            </button>
            <button type="button" class="button detail-close-button">
              닫기
            </button>
          </div>`;
  }

  open() {
    this.modalElement.showModal();
  }

  close() {
    this.modalElement.close();

    const container = document.querySelector(
      "#detail-modal-container"
    ) as HTMLElement;
    container.removeEventListener("click", this.boundHandleStarIconClick);
  }

  addEventListeners() {
    this.closeButton.addEventListener("click", () => this.close());
    this.deleteButton.addEventListener("click", () => {
      this.deleteRestaurant(this.restaurant.name);
      this.close();
    });
    this.modalElement.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#detail-modal-container")) {
        this.close();
      }
    });
  }
}
