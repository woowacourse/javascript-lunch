import { updateFavorite } from "../../domain/restaurant";
import { restaurants } from "../../domain/restaurants";
import findImage from "../../tools/findImage";
import Storage from "../../tools/Storage";
import { renderRestaurantList } from "../RestaurantList/handleRestaurantList";

class FavoriteButton extends HTMLElement {
  restaurantId: string | null;
  favorite: string | null;
  constructor() {
    super();
    this.restaurantId = this.getAttribute("restaurant-id");
    this.favorite = JSON.parse(this.getAttribute("favorite") as string);
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
    return ["favorite"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.favorite = JSON.parse(newValue);
    this.render();
  }

  // 리팩토링 필요
  onClickFavoriteButton(id: string) {
    this.addEventListener("click", (event) => {
      event.stopPropagation();
      updateFavorite(id);
      const buttons = document.querySelectorAll(
        `.favorite-button-${this.restaurantId}`
      );
      buttons.forEach((button) => {
        button.setAttribute("favorite", `${!this.favorite}`);
        renderRestaurantList();
      });
    });
  }
}
export default FavoriteButton;
