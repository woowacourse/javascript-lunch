import CustomButton from "../shared/CustomButton.js";
import RestaurantItem from "./RestaurantItem.js";
import { setupFavoriteEventListeners } from "../handlers/favoriteHandler";
import removeModal from "../utils/removeModal.js";
import { handleDeleteRestaurant } from "../handlers/restaurantHandler";

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

    // 모달이 있다면 모달을 제거하자
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
    // 모달이 없으면 이벤트 리스너를 추가하지 않게
    if (!this.modalElement) return;
    const deleteButton = this.modalElement.querySelector("#delete--restaurant");
    if (deleteButton) {
      deleteButton.addEventListener("click", this.handleDelete.bind(this));
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

    removeModal();
  }

  handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();

    handleDeleteRestaurant(e);
    removeModal();
  }
}

export function AddDetailModal(container, selectedRestaurant) {
  const modal = new DetailModal(container, selectedRestaurant);
  modal.render();
}
