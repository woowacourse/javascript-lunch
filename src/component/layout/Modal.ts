import {
  convertStorageToLocal,
  readFoodList,
} from "../../domain/handler/FoodItemHandler";

import { isFavoriteState } from "../../domain/handler/TabButtonHandler";
import {
  ModalCloseContentType,
  ModalSetContentType,
} from "../../types/component/LayoutType";

export class Modal {
  static setDefaultModal() {
    const container = document.createElement("div");
    container.classList.add("modal");
    container.innerHTML = `
          <div class="modal-backdrop"></div>
          <div class="modal-container">
            <h2 class="modal-title text-title">새로운 음식점</h2>
          </div>
    `;
    const mainCotainer = document.querySelector("main");
    if (mainCotainer) mainCotainer.appendChild(container);
  }

  static setContent({ modalContent }: ModalSetContentType) {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer && (modalContainer.innerHTML = "");
    modalContainer?.appendChild(modalContent);
    document.querySelector(".modal-backdrop")?.addEventListener("click", () => {
      Modal.close({ filter: null });
    });
  }

  static open() {
    const modal = document.querySelector(".modal");
    modal?.classList.add("modal--open");
  }

  static close({ filter = null }: ModalCloseContentType) {
    const modalContent = document.querySelector(".modal");
    modalContent?.classList.remove("modal--open");

    if (filter) {
      const previousFoodList = readFoodList({
        favoriteFilter: isFavoriteState(),
      });
      const foodList = filter.sortedFoodList({ foodList: previousFoodList });
      convertStorageToLocal({ filter, foodList });
    }
  }
}
