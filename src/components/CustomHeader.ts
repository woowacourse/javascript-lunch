import addButtonImage from "../../templates/add-button.png";

class CustomHeader extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
        <header class="gnb">
            <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
            <button type="button" class="gnb__button" aria-label="음식점 추가">
                <img src=${addButtonImage} alt="음식점 추가" />
            </button>
        </header>
    `;
  }
}

const createCustomHeader = () => {
  customElements.define("custom-header", CustomHeader);
};

export default createCustomHeader;
