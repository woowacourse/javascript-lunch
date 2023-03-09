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

  bindEvent(handleClickRemove: (restaurantName: string) => void) {
    this.querySelector(".button--secondary")?.addEventListener("click", () => {
      handleClickRemove(`${this.querySelector("h3")?.innerText}`);
    });
  }
}

export const createModalDetailContent = () => {
  customElements.define("modal-detail", DetailModal, { extends: "div" });
};
