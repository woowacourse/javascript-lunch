import { $ } from "../utils/dom";
import BaseComponent from "./common/BaseComponent";

class NavigationBar extends BaseComponent {
  render() {
    this.innerHTML = `
      <nav class="navigation-bar">
        <div class="all-restaurants selected">모든 음식점</div>
        <div class="favorite-restaurants">자주가는 음식점</div>
      </nav>
    `;
  }

  #selectAllItem() {
    $(".all-restaurants").classList.add("selected");
    $(".favorite-restaurants").classList.remove("selected");
  }
  #selectFavoriteItem() {
    $(".all-restaurants").classList.remove("selected");
    $(".favorite-restaurants").classList.add("selected");
  }

  setEvent() {
    $(".all-restaurants").addEventListener("click", (e) => {
      this.#selectAllItem();
      this.emitEvent("all-restaurants");
    });

    $(".favorite-restaurants").addEventListener("click", (e) => {
      this.#selectFavoriteItem();
      this.emitEvent("favorite-restaurants");
    });
  }
}

customElements.define("navigation-bar", NavigationBar);
