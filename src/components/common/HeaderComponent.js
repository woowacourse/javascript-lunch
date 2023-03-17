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
    const currentMenu = e.target.closest("div div").id;
    const previousMenu =
      currentMenu === MENU.TOTAL_MENU ? MENU.FAVORITE_MENU : MENU.TOTAL_MENU;
    this.changeMenuColor(currentMenu, previousMenu);

    const menuCommend =
      currentMenu === MENU.TOTAL_MENU ? MENU.TOTAL : MENU.FAVORITE;

    dispatcher(RESTAURANT_ACTION.CHANGE_MENU, menuCommend);
  }

  changeMenuColor(currentMenu, previousMenu) {
    document.getElementById(currentMenu).classList.add("current_menu");
    document.getElementById(currentMenu).classList.remove("previous_menu");

    document.getElementById(previousMenu).classList.add("previous_menu");
    document.getElementById(previousMenu).classList.remove("current_menu");
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
          <div id="total_restaurant" class="current_menu text-title">
            모든 음식점
          </div>
          <div id="favorite_restaurant" class="previous_menu text-title">
            자주 가는 음식점
          </div>
        </div>
      </section>
    </header>
    `;
  }
}

customElements.define("header-element", HeaderComponent);

export default HeaderComponent;
