import {
  convertStorageToLocal,
  showFoodItem,
  sortedFoodList,
} from "../../domain/handler/FoodItemHandler";
import { FoodDetail } from "../../pages/FoodDetail";

export class Modal {
  constructor() {
    this.setDefaultModal();
  }

  setDefaultModal() {
    const container = document.createElement("div");
    container.classList.add("modal");
    container.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
        </div>
  `;
    document.querySelector("main").appendChild(container);
  }

  setModalContent(modalContent, filter, modal) {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.innerHTML = "";
    modalContainer.appendChild(modalContent);
    document.querySelector(".modal-backdrop").addEventListener("click", () => {
      Modal.close();
    });
  }

  static open() {
    const modal = document.querySelector(".modal");
    modal.classList.add("modal--open");
  }

  static close(filter = null, modal = null) {
    const modalOpen = document.querySelector(".modal--open");
    const modalContent = document.querySelector(".modal");
    modalContent.classList.remove("modal--open");

    if (filter) {
      const foodList = sortedFoodList(filter);
      convertStorageToLocal(modal, filter, foodList);
    }
  }
}
