import "./GlobalNavigationBar.css";

import addButton from "../../../assets/images/add-button.png";

import BaseComponent from "../../BaseComponent/BaseComponent";

import { $ } from "../../../utils/dom";

import { ELEMENT_SELECTOR } from "../../../constants/selector";
import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";

class GlobalNavigationBar extends BaseComponent {
  private eventListeners = {
    gnbButtonClick: {
      eventName: "click",
      eventHandler: this.handleOpenModal.bind(this),
    },
  } as const;

  protected render() {
    this.innerHTML = /* html */ `
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
      target: $(ELEMENT_SELECTOR.gnbButton) ?? document,
    });
  }

  private handleOpenModal() {
    this.emit(CUSTOM_EVENT_TYPE.restaurantAddModalOpen);
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.gnbButtonClick,
      target: $(ELEMENT_SELECTOR.gnbButton) ?? document,
    });
  }
}

customElements.define("global-navigation-bar", GlobalNavigationBar);
