import "../StarIcon/StarIcon.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import { favoriteStar, nonFavoriteStar } from "../../../assets/images";
import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";
import Restaurant from "../../../domain/Restaurant/Restaurant";

class StarIcon extends BaseComponent {
  private eventListeners = {
    starIconClick: {
      eventName: "click",
      eventHandler: this.handleClickStarIcon.bind(this),
    },
  } as const;

  protected render(): void {
    const isFavorite = this.getAttribute("favorite") === "true";

    this.innerHTML = `
            <img id='star-icon' src='${
              isFavorite ? favoriteStar : nonFavoriteStar
            }' alt='${isFavorite ? "favoriteStar" : "nonFavoriteStar"}' />`;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.starIconClick,
      target: this,
    });
  }

  private handleClickStarIcon(event: Event) {
    const targetElement = event.target;

    if (targetElement instanceof HTMLElement && targetElement.matches("img")) {
      const restaurantName = this.getAttribute("name") ?? "";

      new Restaurant().updateRestaurantDetailInIsFavorite(restaurantName);

      this.emit(CUSTOM_EVENT_TYPE.addRestaurant);
      this.emit(CUSTOM_EVENT_TYPE.rerenderModal);
    }
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.starIconClick,
      target: this,
    });
  }
}

customElements.define("star-icon", StarIcon);
