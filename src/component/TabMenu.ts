import { MenuProps } from "../types/menu.ts";

export default class TabMenu {
  container: HTMLElement;
  #currentMenu: MenuProps = "all";
  onTabChange: () => void = () => {};

  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("tabmenu-container");
    this.render();
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
        const target = event.target as HTMLButtonElement | null;
        if (!target) return;

        const currentMenu = target.dataset.tab;
        if (currentMenu === "all" || currentMenu === "favorite") {
          this.#currentMenu = currentMenu;
          this.setActiveTabStyle();
          this.onTabChange();
        }
      }),
    );
  }
  setActiveTabStyle() {
    this.container.querySelector(".tabmenu--active")?.classList.remove("tabmenu--active");
    this.container.querySelector(`[data-tab=${this.#currentMenu}]`)?.classList.add("tabmenu--active");
  }

  get element() {
    return this.container;
  }
  get currentMenu() {
    return this.#currentMenu;
  }
}
