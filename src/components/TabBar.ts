import { NO_ELEMENT } from "../constants";
import Controller from "../domain/Controller";
import { hideRestaurantFilter, showRestaurantFilter } from "../utils";

class TabBar extends HTMLElement {
  private controller;

  constructor() {
    super();
    this.controller = Controller.getInstance();
    this.render();
    this.onClickTab();
  }

  render() {
    this.innerHTML = `
      <form id="tabContainer" class="tab-container">
        <input id="all" name="tab" value="all" type="radio" class="radio" checked>
        <label id="tab" class="tab tab-selected" for="all">모든 음식점</label>
        <input id="favorite" name="tab" value="favorite" type="radio" class="radio">
        <label id="tab" class="tab" for="favorite">자주 가는 음식점</label>
      </form>
    `;
  }

  onClickTab() {
    const tabContainer = document.getElementById("tabContainer");
    if (tabContainer instanceof HTMLFormElement) {
      tabContainer.addEventListener("change", () => {
        if (TabBar.getCurrentTab() == "favorite") {
          hideRestaurantFilter();
          this.controller.setFavoriteRestaurantList();
          return;
        }
        showRestaurantFilter();
        this.controller.loadLocalStorage();
      });
    }
  }

  static getCurrentTab(): string {
    const currentTab = document.querySelector('input[name="tab"]:checked');
    if (!(currentTab instanceof HTMLInputElement)) {
      return NO_ELEMENT;
    }

    return currentTab.value;
  }
}
export default TabBar;
