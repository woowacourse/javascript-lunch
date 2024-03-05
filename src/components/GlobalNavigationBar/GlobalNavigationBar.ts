import "./GlobalNavigationBar.css";

import BaseComponent from "../BaseComponent/BaseComponent";
import addButton from "../../assets/images/add-button.png";
import { $ } from "../../utils/dom";

class GlobalNavigationBar extends BaseComponent {
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
      target: $("#gnb-button"),
      eventName: "click",
      eventHandler: this.handleOpenModal.bind(this),
    });
  }

  private handleOpenModal() {
    $("restaurant-add-modal").classList.add("modal--open");
  }

  protected removeEvent(): void {
    this.off({
      target: $("#gnb-button"),
      eventName: "click",
      eventHandler: this.handleOpenModal.bind(this),
    });
  }
}

customElements.define("global-navigation-bar", GlobalNavigationBar);
