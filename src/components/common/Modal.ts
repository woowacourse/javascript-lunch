import EventComponent from "../../abstract/EventComponent";

import { $ } from "../../utils/selector";
import { MODAL_EVENT, MODAL_EVENT_ACTION } from "../../constants/event";

export default class Modal extends EventComponent {
  protected getTemplate(): string {
    const isOpen = this.getAttribute("isOpen");
    const modalId = this.getAttribute("modal-id");

    const children = this.innerHTML;

    return `
      <div id=${modalId} class="${isOpen ? "" : "close"}">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${children}
        </div>
      </div>
    `;
  }

  setEvent(): void {
    const modalId = this.getAttribute("modal-id") || "";
    const listeningEventName = this.getAttribute("listening-event-name") || "";

    document.addEventListener(listeningEventName, (e) =>
      this.handleFormModalAction(e as CustomEvent, modalId)
    );

    $(`#${modalId} > .modal-backdrop`)?.addEventListener("click", () => {
      this.closeModal(modalId);
    });
  }

  private handleFormModalAction(e: CustomEvent, modalId: string) {
    const { action } = e.detail;

    if (action === MODAL_EVENT_ACTION.open) {
      this.openModal(modalId);
    }

    if (action === MODAL_EVENT_ACTION.close) {
      this.closeModal(modalId);
    }
  }

  private openModal(modalId: string): void {
    $(`#${modalId}`)?.classList.add("modal--open");
  }

  private closeModal(modalId: string): void {
    $(`#${modalId}`)?.classList.remove("modal--open");
  }

  static get observedAttributes() {
    return ["isOpen", "modal-id", "listening-event-name"];
  }
}
