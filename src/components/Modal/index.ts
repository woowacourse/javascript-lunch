import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";

import { $ } from "../../utils/dom";
import { MenuAppEvent } from "../../types/event";

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

    const openType = this.getAttribute("open-type") ?? "";
    this.isModalOpenEvent(openType) &&
      document.addEventListener(openType, () => {
        this.showModal();
      });

    document.addEventListener(MENU_APP_EVENTS.closeModal, () => {
      this.hideModal();
    });
  }
}

customElements.define("modal-wrapper", Modal);
