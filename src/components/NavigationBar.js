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

  #selectItem() {
    $(".all-restaurants").classList.toggle("selected");
    $(".favorite-restaurants").classList.toggle("selected");
  }

  setEvent() {
    $(".all-restaurants").addEventListener("click", (e) => {
      this.#selectItem();
      this.emitEvent("all-restaurants");
    });

    $(".favorite-restaurants").addEventListener("click", (e) => {
      this.#selectItem();
      this.emitEvent("favorite-restaurants");
    });
  }
}

customElements.define("navigation-bar", NavigationBar);
