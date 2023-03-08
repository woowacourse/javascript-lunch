import { $ } from "../utils/Dom";

class Header {
  template() {
    return `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="./add-button.png" alt="음식점 추가">
      </button>
    </header>`;
  }

  initialize(target: Element) {
    this.render(target);
    this.addEvent();
  }

  addEvent() {
    $(".gnb__button")?.addEventListener("click", () => {
      $(".modal")?.classList.add("modal--open");
    });
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }
}

export default new Header();
