import "./RestaurantAddModal.css";

import BaseComponent from "../BaseComponent/BaseComponent";
import type { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";

import { $ } from "../../utils/dom";
import { getModalTemplate } from "../../utils/modal/modalTemplate";

import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { ELEMENT_SELECTOR } from "../../constants/selector";

class RestaurantAddModal extends BaseComponent {
  private eventListeners: CustomEventListenerDictionary = {
    modalCancelButtonClick: {
      eventName: "click",
      eventHandler: this.handleCancelButton.bind(this),
    },
  };

  protected render(): void {
    this.innerHTML = getModalTemplate(
      `
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <restaurant-add-form></restaurant-add-form>
      `
    );
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.modalCancelButtonClick,
      target: this,
    });
  }

  private handleCancelButton(event: Event) {
    const target = event.target;

    if (
      target instanceof HTMLElement &&
      !target.matches(ELEMENT_SELECTOR.modalCancelButton)
    )
      return;

    this.handleCloseModal();

    this.emit(CUSTOM_EVENT_TYPE.resetForm);
  }

  private handleCloseModal() {
    this.classList.remove("modal--open");
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.modalCancelButtonClick,
      target: $(ELEMENT_SELECTOR.modalCancelButton),
    });
  }
}

customElements.define("restaurant-add-modal", RestaurantAddModal);

export default RestaurantAddModal;
