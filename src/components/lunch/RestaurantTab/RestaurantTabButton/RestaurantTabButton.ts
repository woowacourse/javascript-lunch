import "./RestaurantTabButton.css";

import BaseComponent from "../../../BaseComponent/BaseComponent";
import { $ } from "../../../../utils/dom";
import { CUSTOM_EVENT_TYPE } from "../../../../constants/eventType";

class RestaurantTabButton extends BaseComponent {
  private eventListeners = {
    buttonClick: {
      eventName: "click",
      eventHandler: this.handleClick.bind(this),
    },
  } as const;

  protected render() {
    const isActiveTab = this.getAttribute("isActiveTab");
    const id = this.getAttribute("id");
    const buttonText = this.getAttribute("text");

    this.innerHTML = /* html */ `
      <button type='button' id='${id}' class='${
      isActiveTab === "true" ? "tab-active" : "tab-inactive"
    } restaurant-tab-header-button'>
        <span class='${
          isActiveTab === "true" ? "tab-text-active" : "tab-text-inactive"
        } restaurant-tab-header-text'>${buttonText}</span>
      </button>
    `;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.buttonClick,
      target: $("button", this),
    });
  }

  private handleClick(event: Event) {
    if (event.currentTarget instanceof HTMLButtonElement) {
      this.emit(CUSTOM_EVENT_TYPE.changeTab, event.currentTarget.id);
    }
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.buttonClick,
      target: $("button", this),
    });
  }
}

customElements.define("restaurant-tab-button", RestaurantTabButton);

export default RestaurantTabButton;
