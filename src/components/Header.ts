import addButtonImage from "../../templates/add-button.png";

export class CustomHeader extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src=${addButtonImage} alt="음식점 추가" />
      </button>
    `;
  }

  bindEvent(handleClickAddButton: () => void) {
    this.querySelector(".gnb_button")?.addEventListener("click", () => {
      handleClickAddButton();
    });
  }
}

const createCustomHeader = () => {
  customElements.define("custom-header", CustomHeader, { extends: "header" });
};

export default createCustomHeader;
