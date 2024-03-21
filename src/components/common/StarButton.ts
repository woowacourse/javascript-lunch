import EventComponent from "../../abstract/EventComponent";

import "../../../templates/favorite-icon-filled.png";
import "../../../templates/favorite-icon-lined.png";
import restaurantStore from "../../store/restaurantStore";
import { CUSTOM_BUTTON_EVENT } from "../../constants/event";

export default class StarButton extends EventComponent {
  private restaurantName: string;
  private isFavorite: boolean;
  private clickStarButtonBind: (e: Event) => void;
  private emitStarCustomEventBind: () => void;

  constructor() {
    super();
    this.restaurantName = this.getAttribute("name") ?? "";
    this.isFavorite = restaurantStore
      .getFavoriteRestaurantsName()
      .includes(this.restaurantName)
      ? true
      : false;
    this.clickStarButtonBind = this.clickStarButton.bind(this);
    this.emitStarCustomEventBind = this.emitStarCustomEvent.bind(this);
  }

  protected getTemplate(): string {
    return this.isFavorite
      ? `<img src="./favorite-icon-filled.png" alt="filled" />`
      : `<img src="./favorite-icon-lined.png" alt="lined" />`;
  }

  protected setEvent(): void {
    this.addEventListener("click", this.emitStarCustomEventBind);

    document.addEventListener(
      CUSTOM_BUTTON_EVENT.starButton,
      this.clickStarButtonBind
    );
  }

  private emitStarCustomEvent() {
    if (this.isFavorite)
      restaurantStore.removeFavoriteRestaurantName(this.restaurantName);
    else restaurantStore.setNewFavoriteRestaurantName(this.restaurantName);

    this.dispatchEvent(
      new CustomEvent(CUSTOM_BUTTON_EVENT.starButton, {
        bubbles: true,
        detail: {
          name: this.restaurantName,
        },
      })
    );
  }

  private clickStarButton(e: Event) {
    if (!(e instanceof CustomEvent)) return;
    if (e.detail.name !== this.restaurantName) return;

    this.isFavorite = !this.isFavorite;
    this.render();
  }

  protected removeEvent(): void {
    this.addEventListener("click", this.emitStarCustomEventBind);

    document.removeEventListener(
      CUSTOM_BUTTON_EVENT.starButton,
      this.clickStarButtonBind
    );
  }
}
