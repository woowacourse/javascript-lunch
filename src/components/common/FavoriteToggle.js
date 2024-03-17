import {
  emptyFavoriteToggle,
  filledFavoriteToggle,
} from "../../constants/Icon";
import { favoriteToggle } from "../../domains/RestaurantDetail";
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
    ${this.#isFavorite ? filledFavoriteToggle : emptyFavoriteToggle}

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
