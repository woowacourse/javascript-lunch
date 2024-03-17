import BaseComponent from "../abstract/BaseComponent";

import CategoryIcon from "./CategoryIcon";
import StarButton from "./common/StarButton";

customElements.define("category-icon", CategoryIcon);
customElements.define("star-button", StarButton);

export default class RestaurantItem extends BaseComponent {
  protected getTemplate(): string {
    const category = this.getAttribute("category");
    const name = this.getAttribute("name");
    const timeToReach = this.getAttribute("timeToReach");
    const description = this.getAttribute("description");
    const link = this.getAttribute("link");

    return `
      <li class="restaurant" data-name="${name}">
        <category-icon category=${category}></category-icon>
        <div class="content-wrapper">
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${timeToReach}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
          <star-button></star-button>
        </div>
      </li>
    `;
  }

  static get observedAttributes() {
    return ["category", "name", "timeToReach", "description"];
  }
}
