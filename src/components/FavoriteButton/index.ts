import { updateFavorite } from "../../domain/restaurant";
import findImage from "../../tools/findImage";

class FavoriteButton extends HTMLElement {
  restaurantId: string | null;
  favorite: string | null;

  constructor() {
    super();
    this.restaurantId = this.getAttribute("restaurant-id");
    this.favorite = JSON.parse(this.dataset.favorite as string);
    this.render();
    this.onClickFavoriteButton(this.restaurantId as string);
  }

  render() {
    this.innerHTML = `
    <img
      src="${findImage(this.favorite ? "favoriteFilled" : "favoriteLined")}" 
      alt="즐겨찾기 버튼" 
      class="category-icon"
    >
    `;
  }

  static get observedAttributes() {
    return ["data-favorite"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (newValue === "true" || newValue === "false") {
      this.favorite = JSON.parse(newValue);
      this.render();
    }
  }

  onClickFavoriteButton(id: string) {
    this.addEventListener("click", (event) => {
      event.stopPropagation();
      updateFavorite(id);
      const buttons = document.querySelectorAll(
        `.favorite-button-${this.restaurantId}`
      );
      buttons.forEach((button) => {
        button.setAttribute("data-favorite", `${!this.favorite}`);
      });
    });
  }
}
export default FavoriteButton;
