import "../StarIcon/StarIcon.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import { favoriteStar, nonFavoriteStar } from "../../../assets/images";

class StarIcon extends BaseComponent {
  protected render(): void {
    const isFavorite = this.getAttribute("favorite") === "true";

    this.innerHTML = `
            <img id='star-icon' src='${
              isFavorite ? favoriteStar : nonFavoriteStar
            }' alt='${isFavorite ? "favoriteStar" : "nonFavoriteStar"}' />`;
  }
}

customElements.define("star-icon", StarIcon);
