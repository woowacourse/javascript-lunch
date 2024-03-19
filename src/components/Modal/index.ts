import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";

import { $ } from "../../utils/dom";
import { MenuAppEvent } from "../../types/event";
import { isArrayElement } from "../../utils/types";

const idToModalEventConvertor = {
  "add-form": MENU_APP_EVENTS.openAddForm,
  "restaurant-detail": MENU_APP_EVENTS.openRestaurantDetail,
} as const;

type ModalId = keyof typeof idToModalEventConvertor;

class Modal extends BaseComponent {
  private modalId: string | null = null;

  constructor() {
    super();
  }

  private getModalTemplate(): string {
    this.modalId = this.getAttribute("id") ?? "";
    const children = this.innerHTML;

    return /*html*/ `
      <div class="modal" id=${this.modalId}-wrapper>
        <div class="modal-backdrop" id=${this.modalId}-backdrop></div>
        ${children}
      </div>
    `;
  }

  private showModal() {
    document.body.classList.add("stop-scroll");
    $(`#${this.modalId}-wrapper`)!.classList.add("modal--open");
  }

  private hideModal() {
    document.body.classList.remove("stop-scroll");
    $(`#${this.modalId}-wrapper`)!.classList.remove("modal--open");
  }

  render() {
    this.innerHTML = this.getModalTemplate();
  }

  isModalOpenEvent(type: string): type is MenuAppEvent {
    return ["open-add-form", "open-restaurant-detail"].includes(type);
  }

  setEvent() {
    $<HTMLDivElement>(`#${this.modalId}-backdrop`)!.addEventListener(
      "click",
      (event) => {
        if (event.target === event.currentTarget) {
          this.hideModal();
        }
      }
    );

    const modalId = this.getAttribute("id") ?? "";

    isArrayElement<ModalId>(Object.keys(idToModalEventConvertor), modalId) &&
      document.addEventListener(idToModalEventConvertor[modalId], () => {
        this.showModal();
      });

    document.addEventListener(MENU_APP_EVENTS.closeModal, () => {
      this.hideModal();
    });
  }
}

customElements.define("modal-wrapper", Modal);
