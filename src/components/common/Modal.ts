import EventComponent, {
  EventListenerRegistration,
} from "../../abstract/EventComponent";

import { $ } from "../../utils/selector";
import { MODAL_EVENT_ACTION } from "../../constants/event";

export default class Modal extends EventComponent {
  protected eventHandlerRegistrations: EventListenerRegistration[] = [
    {
      target: document,
      eventName: this.getAttribute("listening-event-name") ?? "",
      handler: (e: Event) => this.handleModalAction(e as CustomEvent),
    },
    {
      target: `#${this.getAttribute("modal-id") ?? ""} > .modal-backdrop`,
      eventName: "click",
      handler: () => this.closeModal(),
    },
  ];

  protected getTemplate(): string {
    const isOpen = this.getAttribute("isOpen") ?? false;
    const modalId = this.getAttribute("modal-id") ?? "";

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

  private handleModalAction(
    e: CustomEvent<{ action: keyof typeof MODAL_EVENT_ACTION }>
  ) {
    const { action } = e.detail;

    if (action === MODAL_EVENT_ACTION.open) {
      this.openModal();
    }

    if (action === MODAL_EVENT_ACTION.close) {
      this.closeModal();
    }
  }

  private openModal(): void {
    $(`#${this.getAttribute("modal-id") ?? ""}`)?.classList.add("modal--open");
  }

  private closeModal(): void {
    $(`#${this.getAttribute("modal-id") ?? ""}`)?.classList.remove(
      "modal--open"
    );
  }
}
