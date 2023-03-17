import { $ } from "@/utils/Dom";
import Render from "@/view/Render";

class Header {
  template() {
    return `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button">
      <img src="./add-button.png" alt="음식점 추가">
      </button>
    </header>`;
  }

  addEvent() {
    $(".gnb__title")?.addEventListener("click", () => {
      location.reload();
    });

    $(".gnb__button")?.addEventListener("click", () => {
      Render.openAddModal();
    });
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }
}

export default new Header();
