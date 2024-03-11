import { addButton } from "../assets/index.js";
import { $ } from "../utils/dom.js";
import BaseComponent from "./BaseComponent.js";

class Header extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
    <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src=${addButton} alt="음식점 추가">
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
