import { DEV_ERROR_MESSAGE } from "../../constants/devErrorMessage.ts";
import { MenuProps } from "../../types/menu.ts";

interface TabMenuOption {
  onTabChange: (currentMenu: string) => void;
}

export default class TabMenu {
  container: HTMLElement;
  #currentMenu: MenuProps = "all";
  #onTabChange: (currentMenu: string) => void = () => {};

  constructor({ onTabChange }: TabMenuOption) {
    this.container = document.createElement("div");
    this.container.classList.add("tabmenu-container");
    this.render();

    this.#onTabChange = onTabChange;
  }

  get element() {
    return this.container;
  }

  get currentMenu() {
    return this.#currentMenu;
  }

  render() {
    this.container.innerHTML = `
     <button class="tabmenu-item" data-tab="all">모든 음식점</button>
     <button class="tabmenu-item" data-tab="favorite">자주 가는 음식점</button>
    `;
    this.setActiveTabStyle();
    this.handleCurrentMenu();
  }

  handleCurrentMenu() {
    this.container.querySelectorAll(".tabmenu-item")?.forEach((tabMenu) =>
      tabMenu.addEventListener("click", (event: Event) => {
        const target = event.target;

        if (!(target instanceof HTMLButtonElement)) {
          throw new Error(DEV_ERROR_MESSAGE.invalidElement);
        }

        const currentMenu = target.dataset.tab;
        if (currentMenu === "all" || currentMenu === "favorite") {
          this.#currentMenu = currentMenu;
          this.setActiveTabStyle();
          this.#onTabChange(this.currentMenu);
        }
      }),
    );
  }

  setActiveTabStyle() {
    this.container.querySelector(".tabmenu--active")?.classList.remove("tabmenu--active");
    this.container.querySelector(`[data-tab=${this.#currentMenu}]`)?.classList.add("tabmenu--active");
  }
}
