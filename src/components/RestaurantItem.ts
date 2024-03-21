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

    // data-name: 레스토랑의 이름은 고유하다는 설정을 해뒀기에 PK 와 같이 고유 식별자로 사용합니다
    // 그래서 레스토랑 이름의 값으로 데이터 전달/수신을 하고 restaurantStore 에서 레스토랑 이름으로 해당 데이터를 받아오고 있어요

    return /* html */ `
      <li class="restaurant" data-name="${name}">
        <category-icon category=${category}></category-icon>
        <div class="content-wrapper">
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${timeToReach}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
          <star-button name="${name}"></star-button>
        </div>
      </li>
    `;
  }

  static get observedAttributes() {
    return ["category", "name", "timeToReach", "description"];
  }
}
