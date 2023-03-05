import Modal from "./Modal";
import addButtonImage from "../../templates/add-button.png";

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
    const $lunchModal = document.querySelector("lunch-modal");

    if (!($lunchModal instanceof Modal)) return;

    $lunchModal.open("add-form");
  }
}

export default LunchHeader;
