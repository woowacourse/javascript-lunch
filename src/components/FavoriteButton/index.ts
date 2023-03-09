import { updateFavorite } from "../../domain/restaurant";
import { restaurants } from "../../domain/restaurants";
import findImage from "../../tools/findImage";
import Storage from "../../tools/Storage";

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
      id="favorite-button-${this.restaurantId}"
      src="${findImage(this.favorite ? "favoriteFilled" : "favoriteLined")}" 
      alt="즐겨찾기 버튼" 
      class="category-icon"
    >
    `;
  }

  // 리팩토링 필요
  onClickFavoriteButton(id: string) {
    const favoriteButton = document.getElementById(`favorite-button-${id}`);
    favoriteButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("button : " + id);
      updateFavorite(id);
    });
  }
}
export default FavoriteButton;
