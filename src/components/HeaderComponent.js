import CustomElement from "../abstracts/CustomElement";

class HeaderComponent extends CustomElement {
  show() {
    document.querySelector(".modal").classList.add("modal--open");
  }

  setEvent() {
    document
      .querySelector(".gnb__button")
      .addEventListener("click", () => this.show());
  }

  template() {
    return `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가" />
      </button>
    </header>
    `;
  }
}

customElements.define("header-element", HeaderComponent);

export default HeaderComponent;
