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
    ${
      this.#isFavorite
        ? `<svg
      width="28"
      height="26"
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="favorite-toggle star"
      >
      <path
      d="M14 21.0267L22.24 26L20.0534 16.6267L27.3334 10.32L17.7467 9.50666L14 0.666656L10.2534 9.50666L0.666687 10.32L7.94669 16.6267L5.76002 26L14 21.0267Z"
      fill="#EC4A0A"
      />
      </svg>`
        : `<svg
        class="favorite-toggle star"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3339_1451)">
          <path
            d="M29.3334 12.32L19.7467 11.4933L16 2.66666L12.2534 11.5067L2.66669 12.32L9.94669 18.6267L7.76002 28L16 23.0267L24.24 28L22.0667 18.6267L29.3334 12.32ZM16 20.5333L10.9867 23.56L12.32 17.8533L7.89335 14.0133L13.7334 13.5067L16 8.13332L18.28 13.52L24.12 14.0267L19.6934 17.8667L21.0267 23.5733L16 20.5333Z"
            fill="#EC4A0A"
            fill-opacity="0.5"
          />
        </g>
        <defs>
          <clipPath id="clip0_3339_1451">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>`
    }

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
