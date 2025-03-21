import CustomButton from "../shared/CustomButton.js";
import RestaurantItem from "./RestaurantItem.js";
import { setupFavoriteEventListeners } from "../handlers/favoriteHandler.js";
import { restaurantStore } from "../store/restaurantStore.js";
import { handleDeleteRestaurant } from "../handlers/restaurantHandler.js";

export class DetailModal {
  constructor(container, restaurant) {
    this.container = container;
    this.restaurant = restaurant;
    this.modalElement = null;
  }

  render() {
    const deleteButton = CustomButton(
      "delete--restaurant",
      "button--secondary",
      "삭제하기",
    );
    const cancelButton = CustomButton(
      "close--modal",
      "button--primary",
      "닫기",
    );

    const modalHTML = /* html */ `
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${RestaurantItem(this.restaurant, true)}
            <div class="button-container">
              ${deleteButton}
              ${cancelButton}
            </div>
        </div>
      </div>
    `;

    const existingModal = document.querySelector(".modal");
    if (existingModal) {
      existingModal.remove();
    }

    this.container.insertAdjacentHTML("beforeend", modalHTML);
    this.modalElement = this.container.querySelector(".modal");

    this.attachEventListeners();
    setupFavoriteEventListeners();
  }

  attachEventListeners() {
    if (!this.modalElement) return;

    const deleteButton = this.modalElement.querySelector("#delete--restaurant");
    if (deleteButton) {
      deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDeleteRestaurant(this.restaurant.id);
        this.remove();
      });
    }

    const closeButton = this.modalElement.querySelector("#close--modal");
    if (closeButton) {
      closeButton.addEventListener("click", this.handleClose.bind(this));
    }

    const backdrop = this.modalElement.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", this.handleClose.bind(this));
    }
  }

  handleClose(e) {
    e.preventDefault();
    e.stopPropagation();
    this.remove();
  }

  remove() {
    if (this.modalElement) {
      this.modalElement.remove();
    }
  }
}

export function handleRestaurantClick(e) {
  const $clickedItem = e.target.closest(".restaurant");
  if (!$clickedItem || $clickedItem.classList.contains("modal-restaurant")) {
    return;
  }

  const { restaurantId } = $clickedItem.dataset;
  if (!restaurantId) return;

  const selectedRestaurant = restaurantStore.getById(restaurantId);
  if (selectedRestaurant) {
    const $appContainer = document.getElementById("app");
    if ($appContainer) {
      const modal = new DetailModal($appContainer, selectedRestaurant);
      modal.render();
    }
  }
}

export function setupRestaurantItemEventListeners() {
  const $restaurantItems = document.querySelectorAll(
    ".restaurant:not(.modal-restaurant)",
  );

  $restaurantItems.forEach((item) => {
    item.removeEventListener("click", handleRestaurantClick);
    item.addEventListener("click", handleRestaurantClick);
  });
}
