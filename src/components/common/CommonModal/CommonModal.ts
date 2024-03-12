import "./CommonModal.css";

import BaseComponent from "../../BaseComponent/BaseComponent";
import { CustomEventType } from "../../BaseComponent/BaseComponent.type";
import { $ } from "../../../utils/dom";

class CommonModal extends BaseComponent {
  private eventHandlers = {
    handleOpen: (targetSelector: string) => this.handleOpen(targetSelector),
    handleClose: (targetSelector: string) => this.handleClose(targetSelector),
  };

  protected render() {
    const children = this.getAttribute("children");

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
    const openState = (this.getAttribute("open") as CustomEventType) ?? "";
    const closeState = (this.getAttribute("close") as CustomEventType) ?? "";
    const targetSelector = this.getAttribute("targetSelector") ?? "";

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
    const openState = (this.getAttribute("open") as CustomEventType) ?? "";
    const closeState = (this.getAttribute("close") as CustomEventType) ?? "";
    const targetSelector = this.getAttribute("targetSelector") ?? "";

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
      (dialogElement as HTMLDialogElement).showModal();
    }
  }

  private handleClose(targetSelector: string) {
    const dialogElement = $(`${targetSelector}>dialog`);

    if (dialogElement instanceof HTMLDialogElement) {
      (dialogElement as HTMLDialogElement).close();
    }
  }
}

customElements.define("common-modal", CommonModal);
