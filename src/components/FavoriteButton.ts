import "./FavoriteButton.style.css";

import favoriteFilledImage from "../images/favorite-icon-filled.png";
import favoriteLinedImage from "../images/favorite-icon-lined.png";

class FavoriteButton extends HTMLButtonElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("class", "favorite-button");
    this.render();
    this.bindEvent();
  }

  render() {
    this.innerHTML = `
      <img
        src=${false ? favoriteFilledImage : favoriteLinedImage}
        alt="즐겨찾기 버튼"
        class="favorite-icon"
      />
    `;
  }

  bindEvent() {
    this.addEventListener("click", this.onClick.bind(this));
  }

  onClick(event: Event) {
    if (!(event.currentTarget instanceof HTMLButtonElement)) return;

    console.log(event.currentTarget.value);
  }
}

export default FavoriteButton;
