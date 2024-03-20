import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";
import { toggleFavoriteStateByName } from "../../domains/Restaurants";
import { filledFavoriteIcon, linedFavoriteIcon } from "../../assets/index";

class FavoriteIcon extends BaseComponent {
  protected render() {
    const isFavorite = this.getAttribute("is-favorite") === "true";

    this.innerHTML = /*html*/ `
      <img alt="favorite-icon" class="favorite-icon" 
      src=${isFavorite ? filledFavoriteIcon : linedFavoriteIcon}></img>
      `;
  }

  private toggleFavoriteIcon(iconElement: HTMLImageElement) {
    const prevIcon = iconElement?.getAttribute("src");
    iconElement?.setAttribute("src", prevIcon === linedFavoriteIcon ? filledFavoriteIcon : linedFavoriteIcon);
  }

  private toggleFavoriteState() {
    const restaurantName = this.getAttribute("restaurant-name") ?? "";
    toggleFavoriteStateByName(restaurantName);
  }

  private handleToggleFavoriteIcon(element: HTMLElement) {
    const iconElement = element.closest("img");
    if (!(iconElement instanceof HTMLImageElement)) return;

    this.toggleFavoriteIcon(iconElement);
    this.toggleFavoriteState();
    this.emitEvent(MENU_APP_EVENTS.renderRestaurants);
  }

  protected setEvent() {
    this.addEventListener("click", (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      this.handleToggleFavoriteIcon(event.target);
    });
  }
}

customElements.define("favorite-icon", FavoriteIcon);
