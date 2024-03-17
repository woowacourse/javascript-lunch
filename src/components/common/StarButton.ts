import EventComponent from "../../abstract/EventComponent";

import "../../../templates/favorite-icon-filled.png";
import "../../../templates/favorite-icon-lined.png";
import restaurantStore from "../../store/restaurantStore";

export default class StarButton extends EventComponent {
  private restaurantName: string;
  private isFavorite: boolean;
  private clickStarButtonBind: (e: Event) => void;

  constructor() {
    super();
    this.restaurantName = this.getAttribute("name") ?? "";
    this.isFavorite = restaurantStore
      .getFavoriteRestaurantsName()
      .includes(this.restaurantName)
      ? true
      : false;
    this.clickStarButtonBind = this.clickStarButton.bind(this);
  }

  protected getTemplate(): string {
    return this.isFavorite
      ? `<img src="./favorite-icon-filled.png" alt="filled" />`
      : `<img src="./favorite-icon-lined.png" alt="lined" />`;
  }

  protected setEvent(): void {
    this.addEventListener("click", this.clickStarButtonBind);
  }

  private clickStarButton(e: Event) {
    if (this.isFavorite)
      restaurantStore.removeFavoriteRestaurantName(this.restaurantName);
    else restaurantStore.setNewFavoriteRestaurantName(this.restaurantName);

    this.isFavorite = !this.isFavorite;
    this.render();
  }

  protected removeEvent(): void {
    this.addEventListener("click", this.clickStarButtonBind);
  }
}
