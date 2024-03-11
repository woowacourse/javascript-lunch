import { add_button } from "../assets/index.js";
import { $ } from "../utils/dom.js";
import BaseComponent from "./BaseComponent.js";

class Header extends BaseComponent {
  render() {
    this.innerHTML = `
    <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점을 음식점 목록에 추가해주는 버튼">
          <img src=${add_button} alt="음식점 추가">
        </button>
    </header>
  `;
  }

  setEvent() {
    $(".gnb__button").addEventListener("click", (e) => {
      this.emitEvent("modal-open");
    });
  }
}

customElements.define("app-header", Header);
