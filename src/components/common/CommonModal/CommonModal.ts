import "./CommonModal.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import { $ } from "../../../utils/dom";
import { isCustomEventType } from "../../../utils/typeGuard";

class CommonModal extends BaseComponent {
  private eventHandlers = {
    handleOpen: (targetSelector: string) => this.handleOpen(targetSelector),
    handleClose: (targetSelector: string) => this.handleClose(targetSelector),
  };

  protected render() {
    const children = this.innerHTML;

    this.innerHTML = `
        <dialog id="common-modal-dialog">
          <div class="modal-backdrop"></div>
          <div class="modal-container">
            ${children}
          </div>
        </dialog>
      `;
  }

  protected setEvent(): void {
    const openState = this.getAttribute("open") ?? "";
    const closeState = this.getAttribute("close") ?? "";
    const targetSelector = this.getAttribute("targetSelector") ?? "";

    if (!isCustomEventType(openState) || !isCustomEventType(closeState)) return;

    this.on({
      eventName: openState,
      eventHandler: this.eventHandlers.handleOpen.bind(this, targetSelector),
      target: document,
    });

    this.on({
      eventName: closeState,
      eventHandler: this.eventHandlers.handleClose.bind(this, targetSelector),
      target: document,
    });
  }

  protected removeEvent(): void {
    const openState = this.getAttribute("open") ?? "";
    const closeState = this.getAttribute("close") ?? "";
    const targetSelector = this.getAttribute("targetSelector") ?? "";

    if (!isCustomEventType(openState) || !isCustomEventType(closeState)) return;

    this.off({
      eventName: openState,
      eventHandler: this.eventHandlers.handleOpen.bind(this, targetSelector),
      target: document,
    });

    this.off({
      eventName: closeState,
      eventHandler: this.eventHandlers.handleClose.bind(this, targetSelector),
      target: document,
    });
  }

  private handleOpen(targetSelector: string) {
    const dialogElement = $(`${targetSelector}>dialog`);

    if (dialogElement instanceof HTMLDialogElement) {
      dialogElement.showModal();
    }
  }

  private handleClose(targetSelector: string) {
    const dialogElement = $(`${targetSelector}>dialog`);

    if (dialogElement instanceof HTMLDialogElement) {
      dialogElement.close();
    }
  }
}

customElements.define("common-modal", CommonModal);
