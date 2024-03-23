import BaseComponent from "../BaseComponent/BaseComponent";
import ImageButton from "../../utils/ImageButton";

import { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";

import { favoriteIconFilled, favoriteIconLined } from "../../assets/images";

import { CUSTOM_EVENT_TYPE } from "./../../constants/eventType";

class FavoriteButton extends BaseComponent {
  private favoriteButtonConfig = {
    id: "",
    name: "favorite",
    filledImageSrc: favoriteIconFilled,
    linedImageSrc: favoriteIconLined,
    isFilled: false,
  };

  private eventListeners: CustomEventListenerDictionary = {
    favoriteButtonClick: {
      eventName: "click",
      eventHandler: this.handleFavoriteButtonClick.bind(this),
    },
  };

  private imageButton = new ImageButton(this.favoriteButtonConfig);

  constructor() {
    super();

    const { restaurantName, restaurantFavorite } = this.dataset;

    if (restaurantName) {
      this.favoriteButtonConfig.id = restaurantName;
    }

    this.favoriteButtonConfig.isFilled = restaurantFavorite === "true";
  }

  protected render(): void {
    this.innerHTML = this.imageButton.getTemplate();
  }

  private handleFavoriteButtonClick() {
    this.emit(CUSTOM_EVENT_TYPE.toggleFavoriteButton, {
      restaurantName: this.favoriteButtonConfig.id,
    });
  }

  protected setEvent(): void {
    this.imageButton.setEvent();

    this.on({
      ...this.eventListeners.favoriteButtonClick,
      target: this,
    });
  }
}

customElements.define("favorite-button", FavoriteButton);

export default FavoriteButton;
