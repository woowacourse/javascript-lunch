import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";
import { addButton } from "../../assets";
import { $ } from "../../utils/dom";

class Header extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = /*html*/ `
    <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src=${addButton} alt="음식점 추가">
        </button>
    </header>
  `;
  }

  setEvent() {
    $(".gnb__button")!.addEventListener("click", () => {
      this.emitEvent(MENU_APP_EVENTS.openAddForm);
    });
  }
}

customElements.define("app-header", Header);
