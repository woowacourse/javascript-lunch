import CustomElement from "../abstracts/CustomElement";
import dispatcher from "../domain/Dispatcher";

class HeaderComponent extends CustomElement {
  handleEvent() {
    this.querySelector(".gnb__button").addEventListener("click", () =>
      dispatcher("modal_on", true)
    );
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
