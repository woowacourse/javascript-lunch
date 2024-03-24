import { ADD_RESTAURANT_FORM_BUTTON } from "../constants/Icon.js";
import { $ } from "../utils/dom.js";
import BaseComponent from "./common/BaseComponent.js";

class Header extends BaseComponent {
  render() {
    this.innerHTML = `
    <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 목록 추가 버튼">
         ${ADD_RESTAURANT_FORM_BUTTON}
        </button>
    </header>
  `;
  }

  setEvent() {
    $(".gnb__button").addEventListener("click", (e) => {
      this.emitEvent("form-modal-open");
    });
  }
}

customElements.define("app-header", Header);
