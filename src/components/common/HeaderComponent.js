import { RESTAURANT_ACTION } from "../../abstracts/constants";
import CustomElement from "../../abstracts/CustomElement";
import dispatcher from "../../domain/Dispatcher";

class HeaderComponent extends CustomElement {
  setEvent() {
    document
      .querySelector(".gnb__button")
      .addEventListener("click", this.showModal);

    document
      .querySelector(".menu__container")
      .addEventListener("click", (e) => {
        this.changeMenu(e);
      });
  }

  changeMenu(e) {
    const { id, parentNode } = e.target;
    const total = "total_restaurant";
    const favorite = "favorite_restaurant";
    if (id === total || parentNode.id === total) {
      document.getElementById(total).style.borderBottom =
        "2px solid var(--primary-color)";
      document.getElementById(favorite).style.borderBottom =
        "2px solid var(--grey-200)";
      dispatcher(RESTAURANT_ACTION.CHANGE_MENU, "total");
    }

    if (id === favorite || parentNode.id === favorite) {
      document.getElementById(total).style.borderBottom =
        "2px solid var(--grey-200)";
      document.getElementById(favorite).style.borderBottom =
        "2px solid var(--primary-color)";
      dispatcher(RESTAURANT_ACTION.CHANGE_MENU, "favorite");
    }
  }

  showModal() {
    document.querySelector(".modal").classList.add("modal--open");
  }

  template() {
    return `
    <header class="head">
      <section class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
      </section>
      <section class="menu">
        <div class="menu__container">
          <div id="total_restaurant">
            <h1  class="text-title">모든 음식점</h1>
          </div>
          <div id="favorite_restaurant">
            <h1 class="text-title">자주 가는 음식점</h1>
          </div>
        </div>
      </section>
    </header>
    `;
  }
}

customElements.define("header-element", HeaderComponent);

export default HeaderComponent;
