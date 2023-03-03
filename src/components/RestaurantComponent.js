import { CATEGORY_IMG } from "../abstracts/constants";
import CustomElement from "../abstracts/CustomElement";

class RestaurantComponent extends CustomElement {
  template() {
    const name = this.getAttribute("name");
    const category = this.getAttribute("category");
    const distance = this.getAttribute("distance");
    const description = this.getAttribute("description");
    return `
    <li class="restaurant">
    <div class="restaurant__category">
        <img
            src="${CATEGORY_IMG[category]}"             
            alt=${category}
            class="category-icon"
        />
    </div>
    <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
        <p class="restaurant__description text-body">
          ${description}
        </p>
    </div>
  </li>
        `;
  }
}

customElements.define("restaurant-element", RestaurantComponent);

export default RestaurantComponent;
