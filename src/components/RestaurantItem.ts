import BaseComponent from "../abstract/BaseComponent";
import favoriteStore from "../store/favoriteStore";

import CategoryIcon from "./CategoryIcon";

customElements.define("category-icon", CategoryIcon);

export default class RestaurantItem extends BaseComponent {
  protected getTemplate(): string {
    const favoriteRestaurantNames = favoriteStore.get();

    const category = this.getAttribute("category") ?? "";
    const name = this.getAttribute("name") ?? "";
    const timeToReach = this.getAttribute("timeToReach") ?? "";
    const description = this.getAttribute("description") ?? "";
    const link = this.getAttribute("link") ?? "";

    const isFavorite = favoriteRestaurantNames.includes(name);

    return `
      <li class="restaurant">
      <div class="restaurant-item-content">
        <category-icon category=${category}></category-icon>
        <div class="restaurant__info">
          <h2 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${timeToReach}분 내</span>
          <p class="restaurant__description text-body">${description}</p>
        </div>
      </div>

      <favorite-icon class="restaurant__favorite" isActive="${isFavorite}" itemName="${name}"></favorite-icon>
      </li>
    `;
  }

  static get observedAttributes() {
    return ["category", "name", "timeToReach", "description"];
  }
}
