import "../../templates/blank-favorite-icon.png";
import "../../templates/filled-favorite-icon.png";

import EventComponent from "../abstract/EventComponent";
import { TOGGLE_FAVORITE_EVENT } from "../constants/event";
import favoriteStore from "../store/favoriteStore";

const blankIconPath = "./blank-favorite-icon.png";
const filledIconPath = "./filled-favorite-icon.png";

export default class FavoriteIcon extends EventComponent {
  protected getTemplate(): string {
    const isActive = this.getAttribute("isActive") === "true";

    return `
      <div class="favorite-icon">
        <img class="favorite-icon-img" src=${
          isActive ? filledIconPath : blankIconPath
        } alt="좋아하는 식당 아이콘" />
      </div>
    `;
  }

  protected setEvent(): void {
    this.addEventListener("click", this.handleIconClick.bind(this));

    document.addEventListener(TOGGLE_FAVORITE_EVENT, (e) =>
      this.handleToggleFavoriteEvent(e as CustomEvent)
    );
  }

  private handleIconClick() {
    const itemName = this.getAttribute("itemName") ?? "";
    const changesToActive = !(this.getAttribute("isActive") === "true");

    favoriteStore.toggle(itemName, changesToActive);

    this.dispatchEvent(
      new CustomEvent(TOGGLE_FAVORITE_EVENT, {
        bubbles: true,
        detail: { itemName, changesToActive },
      })
    );
  }

  private handleToggleFavoriteEvent(e: CustomEvent) {
    const { itemName, changesToActive } = e.detail;

    if (itemName === this.getAttribute("itemName")) {
      this.toggleFavorite(changesToActive);
      this.render();
    }
  }

  private toggleFavorite(changesToActive: boolean) {
    this.setAttribute("isActive", String(changesToActive));
  }

  static get observedAttributes(): string[] {
    return ["itemName", "isActive"];
  }
}