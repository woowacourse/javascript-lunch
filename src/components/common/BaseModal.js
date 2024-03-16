import { getRestaurantDetail } from "../../domains/RestaurantDetail";
import { $ } from "../../utils/dom";
import BaseComponent from "./BaseComponent";

export default class BaseModal extends BaseComponent {
  #modalId;

  render() {
    const children = this.innerHTML;
    this.#modalId = this.getAttribute("modalId");

    this.innerHTML = `
      <div class="modal ${this.#modalId}">
        <div class="modal-backdrop back-${this.#modalId}"></div>
        <div class="modal-container">${children}
        </div>
      </div>
      </div>
    `;
  }
  modalOpen(dom) {
    $(dom).classList.add("modal--open");
  }
  modalClose(dom) {
    $(dom).classList.remove("modal--open");
  }

  setEvent() {
    document.addEventListener("form-modal-open", () => {
      this.modalOpen(".addForm");
    });

    document.addEventListener("detail-modal-open", () => {
      this.modalOpen(".detail");
    });

    $(`.back-${this.#modalId}`).addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.modalClose(`.${this.#modalId}`);
      }
    });
  }
}

customElements.define("base-modal", BaseModal);
