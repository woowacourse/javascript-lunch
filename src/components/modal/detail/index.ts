import { Modal } from "..";
import { Info } from "./info";

export class DetailModal extends HTMLDivElement {
  constructor() {
    super();

    this.init();
  }

  init() {
    this.innerHTML = `
        <div style="display: flex; flex-direction: column;">
            <div is="detail-info" class="restaurant-detail-container"></div>
            <div class="button-container" style="padding-right: 16px;">
                <button class="button button--secondary text-caption">삭제하기</button>
                <button class="button button--primary text-caption">닫기</button>
            </div>
        </div>
    `;
  }

  bindEvent(
    handleClickRemove: (restaurantId: string) => void,
    handleClickLikeIcon: (restaurantId: string) => void
  ) {
    this.querySelector(".button--secondary")?.addEventListener("click", () => {
      const restaurantId = this.getRestaurantId();

      handleClickRemove(restaurantId);
    });

    this.querySelector(".button--primary")?.addEventListener("click", () => {
      document.querySelector<Modal>(".modal")?.closeModal();
    });

    this.querySelector(".detail-like-image")?.addEventListener("click", () => {
      const restaurantId = this.getRestaurantId();

      handleClickLikeIcon(restaurantId);
    });
  }

  getRestaurantId() {
    return `${this.querySelector<Info>(
      ".restaurant-detail-container"
    )?.getId()}`;
  }
}

export const createModalDetailContent = () => {
  customElements.define("modal-detail", DetailModal, { extends: "div" });
};
