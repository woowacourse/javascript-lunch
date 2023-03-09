import "./LunchHeader.style.css";

import Modal from "./modal/ModalRoot";
import addButtonImage from "../images/add-button.png";

class LunchHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.bindEvent();
  }

  render() {
    this.innerHTML = `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src=${addButtonImage} alt="음식점 추가" />
      </button>
    `;
  }

  bindEvent() {
    this.querySelector(".gnb__button")?.addEventListener(
      "click",
      this.onClickAddButton.bind(this)
    );
  }

  onClickAddButton() {
    const modalRoot = document.querySelector<Modal>("modal-root");

    modalRoot?.open("restaurant-add-modal");
  }
}

export default LunchHeader;
