import { Constants } from "../utils/Constants";
import { $, $$ } from "../utils/Dom";

class NavigatorContainer {
  currentMenu: string;

  constructor() {
    this.currentMenu = Constants.TOTAL;
  }

  template() {
    return `
    <div class="navigator-container">
    <div class="total-page menu active" data-id="total">모든 음식점</div>
    <div class="bookmark-page menu" data-id="bookmark">자주 가는 음식점</div>
    </div>
    `;
  }

  initialize(
    target: Element,
    navigateToPage: (id: string) => void,
    rerenderList: () => void
  ) {
    this.render(target);
    this.addEvent(navigateToPage, rerenderList);
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  addEvent(navigateToPage: (page: string) => void, rerenderList: () => void) {
    $(".navigator-container")?.addEventListener("click", (event) => {
      const target = <HTMLElement>event.target;
      const id = <string>target.closest("div")?.dataset.id;

      if (this.currentMenu !== id) {
        this.currentMenu = id;

        navigateToPage(id);
        this.changeActiveMenuStyle();
        rerenderList();
      }
    });
  }

  changeActiveMenuStyle() {
    $$(".menu").forEach((menu) => {
      menu.classList.toggle("active");
    });
  }
}

export default new NavigatorContainer();
