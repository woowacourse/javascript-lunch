import { $ } from "../utils/dom";
import BaseComponent from "./common/BaseComponent";

class NavigationBar extends BaseComponent {
  #allRestaurantsTab;
  #favoriteRestaurantsTab;

  constructor() {
    this.#allRestaurantsTab = $(".all-restaurants");
    this.#favoriteRestaurantsTab = $(".favorite-restaurants");
  }

  render() {
    this.innerHTML = `
      <nav class="navigation-bar">
        <div class="all-restaurants selected">모든 음식점</div>
        <div class="favorite-restaurants">자주가는 음식점</div>
      </nav>
    `;
  }

  #selectAllItem() {
    this.#allRestaurantsTab.classList.add("selected");
    this.#favoriteRestaurantsTab.classList.remove("selected");
  }
  #selectFavoriteItem() {
    this.#allRestaurantsTab.classList.remove("selected");
    this.#favoriteRestaurantsTab.classList.add("selected");
  }

  setEvent() {
    this.#allRestaurantsTab.addEventListener("click", (e) => {
      this.#selectAllItem();
      this.emitEvent("all-restaurants");
    });

    this.#favoriteRestaurantsTab.addEventListener("click", (e) => {
      this.#selectFavoriteItem();
      this.emitEvent("favorite-restaurants");
    });
  }
}

customElements.define("navigation-bar", NavigationBar);
