import { RESTAURANT_ACTION, MENU } from "../../abstracts/constants";
import CustomElement from "../../abstracts/CustomElement";
import dispatcher from "../../domain/Dispatcher";

class HeaderComponent extends CustomElement {
  setEvent() {
    const gnb__button = document.querySelector(".gnb__button");
    if (gnb__button) gnb__button.addEventListener("click", this.showModal);

    const menu__container = document.querySelector(".menu__container");
    if (menu__container)
      menu__container.addEventListener("click", (e) => {
        this.changeMenu(e);
      });
  }

  changeMenu(e) {
    const { id, parentNode } = e.target;
    if (id === MENU.TOTAL_MENU || parentNode.id === MENU.TOTAL_MENU) {
      this.changeMenuColor(MENU.TOTAL_MENU, MENU.FAVORITE_MENU);
      dispatcher(RESTAURANT_ACTION.CHANGE_MENU, MENU.TOTAL);
    }

    if (id === MENU.FAVORITE_MENU || parentNode.id === MENU.FAVORITE_MENU) {
      this.changeMenuColor(MENU.FAVORITE_MENU, MENU.TOTAL_MENU);
      dispatcher(RESTAURANT_ACTION.CHANGE_MENU, MENU.FAVORITE);
    }
  }

  changeMenuColor(currentMenu, previousMenu) {
    document.getElementById(currentMenu).style.borderBottom =
      "2px solid var(--primary-color)";
    document.getElementById(previousMenu).style.borderBottom =
      "2px solid var(--grey-200)";
  }
  showModal() {
    const modal = document.querySelector(".modal");
    if (modal) modal.classList.add("modal--open");
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
