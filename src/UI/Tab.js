import { FAVORITE } from "../constants";
import { $, $$ } from "../utils/Dom";

class Tab {
  #template = `
  <ul class="tab-menu-list">
    <li class="tab-menu active">모든 음식점</li>
    <li class="tab-menu">자주 가는 음식점</li>
  </ul>`;

  constructor() {
    $(".restaurant-tab-container").insertAdjacentHTML(
      "beforeend",
      this.#template
    );

    this.addEvent();
  }

  addEvent() {
    const tabMenuContainer = $(".tab-menu-list");
    const tabMenu = $$(".tab-menu");
    const tabItems = $$(".tab-item");
    const tabFilter = $(".tab-filter");
    tabMenuContainer.addEventListener("click", function (e) {
      if (!e.target.classList.contains("active")) {
        tabItems.forEach((item) => {
          item.classList.toggle("active");
        });
        tabMenu.forEach((menu) => {
          menu.classList.toggle("active");
        });
      }

      e.target.textContent === FAVORITE
        ? tabFilter.classList.add("active")
        : tabFilter.classList.remove("active");
    });
  }
}

export default Tab;
