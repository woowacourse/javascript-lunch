import BaseComponent from "../../abstract/BaseComponent";

import "../../../templates/favorite-icon-filled.png";
import "../../../templates/favorite-icon-lined.png";

export default class StarButton extends BaseComponent {
  protected getTemplate(): string {
    const isFavorite = this.getAttribute("isFavorite");

    return isFavorite
      ? `<img src="./favorite-icon-filled.png" alt="filled" />`
      : `<img src="./favorite-icon-lined.png" alt="lined" />`;
  }

  static get observedAttributes() {
    return ["isFavorite"];
  }
}
