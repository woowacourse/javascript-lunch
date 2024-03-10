import "./GlobalNavigationBar.css";

import addButton from "../../../assets/images/add-button.png";

import BaseComponent from "../../BaseComponent/BaseComponent";
import { CustomEventListenerDictionary } from "../../BaseComponent/BaseComponent.type";

import { $ } from "../../../utils/dom";

import { ELEMENT_SELECTOR } from "../../../constants/selector";

class GlobalNavigationBar extends BaseComponent {
  private eventListeners: CustomEventListenerDictionary = {
    gnbButtonClick: {
      eventName: "click",
      eventHandler: this.handleOpenModal,
    },
  };

  protected render() {
    this.innerHTML = `
        <header class="gnb">
            <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
            <button id="gnb-button" type="button" class="gnb__button" aria-label="음식점 추가">
            <img src=${addButton} alt="음식점 추가">
            </button>
        </header>
        `;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.gnbButtonClick,
      target: $(ELEMENT_SELECTOR.gnbButton),
    });
  }

  private handleOpenModal() {
    const modalContent = $(ELEMENT_SELECTOR.commonModalContent);

    if (modalContent instanceof HTMLDialogElement) {
      modalContent.showModal();
    }
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.gnbButtonClick,
      target: $(ELEMENT_SELECTOR.gnbButton),
    });
  }
}

customElements.define("global-navigation-bar", GlobalNavigationBar);
