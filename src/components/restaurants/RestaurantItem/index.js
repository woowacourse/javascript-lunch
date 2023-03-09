import "./index.css";
import translateCategory from "../../../util/translateCategory";

class RestaurantItem {
  restaurantInfo;

  constructor(restaurantInfo) {
    this.restaurantInfo = restaurantInfo;
  }

  template() {
    return `
        <li class="restaurant">
        <div class="restaurant__category">
          <img
            src="./category-${translateCategory(this.restaurantInfo.category)}.png"
            alt="${this.restaurantInfo.category}"
            class="category-icon"
          />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${this.restaurantInfo.name}</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${this.restaurantInfo.distance}분 내</span
          >
          <p class="restaurant__description text-body">
            ${this.restaurantInfo.description}
          </p>
        </div>
        <div class="favorite_restaurant">
          <img
            src="./favorite-icon-lined.png"
            alt="즐겨찾기"
          />
        </div>
      </li>
        `;
  }
}

export default RestaurantItem;
