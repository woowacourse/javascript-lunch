import {
  EMPTY_FAVORITE_TOGGLE,
  FILLED_FAVORITE_TOGGLE,
} from "../../constants/Icon";
import { favoriteToggle } from "../../domains/Restaurants";
import BaseComponent from "./BaseComponent";

class FavoriteToggle extends BaseComponent {
  #isFavorite;

  constructor() {
    super();
    const isFavoriteAttr = this.getAttribute("isFavorite");
    this.#isFavorite = isFavoriteAttr === "true";
    this.render();
  }

  render() {
    this.innerHTML = `
      <button class="modal-star" id="favorite-toggle">
        ${this.#isFavorite ? FILLED_FAVORITE_TOGGLE : EMPTY_FAVORITE_TOGGLE}
      </button>
    `;
  }

  setEvent() {
    this.addEventListener("click", (e) => {
      const name = this.getAttribute("name");
      this.#isFavorite = !this.#isFavorite;
      favoriteToggle(name);
      this.emitEvent("favorite-click");
      this.render();
    });
  }
}

customElements.define("favorite-toggle", FavoriteToggle);
