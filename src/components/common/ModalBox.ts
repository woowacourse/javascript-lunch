import EventComponent from "../../abstract/EventComponent";

import { $ } from "../../utils/selector";
import { MODAL_EVENT, ACTION_TYPES } from "../../constants/event";
import MODAL_ID from "../../constants/modalId";

export default class ModalBox extends EventComponent {
  private handleFormModalActionBind: (e: Event, modalId: string) => void;

  constructor() {
    super();
    this.handleFormModalActionBind = this.handleFormModalAction.bind(this);
  }

  protected getTemplate(): string {
    const isOpen = this.getAttribute("isOpen");
    const modalId = this.getAttribute("modal-id");

    const children = this.innerHTML;

    return `
      <div id=${modalId} class="modal ${isOpen ? "modal--open" : ""}">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${children}
        </div>
      </div>
    `;
  }

  setEvent(): void {
    const modalId = this.getAttribute("modal-id") || "";

    modalId === MODAL_ID.restaurantFormModal &&
      document.addEventListener(MODAL_EVENT.restaurantFormModalAction, (e) =>
        this.handleFormModalActionBind(e, modalId)
      );

    modalId === MODAL_ID.restaurantDetailModal &&
      document.addEventListener(MODAL_EVENT.restaurantDetailModalAction, (e) =>
        this.handleFormModalActionBind(e, modalId)
      );

    $(`#${modalId} > .modal-backdrop`)?.addEventListener("click", () => {
      this.closeModal(modalId);
    });
  }

  private handleFormModalAction(e: Event, modalId: string) {
    if (!(e instanceof CustomEvent)) return;

    const { action } = e.detail;

    if (action === ACTION_TYPES.open) {
      this.openModal(modalId);
    }

    if (action === ACTION_TYPES.close) {
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
    return ["isOpen", "modal-id"];
  }

  protected removeEvent(): void {
    const modalId = this.getAttribute("modal-id") || "";

    modalId === MODAL_ID.restaurantFormModal &&
      document.removeEventListener(MODAL_EVENT.restaurantFormModalAction, (e) =>
        this.handleFormModalActionBind(e, modalId)
      );

    modalId === MODAL_ID.restaurantDetailModal &&
      document.removeEventListener(
        MODAL_EVENT.restaurantDetailModalAction,
        (e) => this.handleFormModalActionBind(e, modalId)
      );

    $(`#${modalId} > .modal-backdrop`)?.removeEventListener("click", () => {
      this.closeModal(modalId);
    });
  }
}
