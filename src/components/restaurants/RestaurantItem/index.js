import "./index.css";
import translateCategory from "../../../util/translateCategory";
import LocalStorage from "../../../util/LocalStorage";
import { $ } from "../../../util/dom";

class RestaurantItem {
  $target;
  restaurantInfo;
  restaurantListManager;

  constructor($target, restaurantInfo, restaurantListManager) {
    this.$target = $target;
    this.restaurantInfo = restaurantInfo;
    this.restaurantListManager = restaurantListManager;

    this.render();
    this.setEvent();
  }

  template() {
    return `
        <li id="restaurant${this.restaurantInfo.id}" class="restaurant">
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
        <div class="favorite">
          <img
            src="./favorite-icon-${this.restaurantInfo.favorite ? "filled" : "lined"}.png"
            alt="즐겨찾기"
          />
        </div>
      </li>
        `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent() {
    const id = this.restaurantInfo.id;

    this.$target.querySelector(`#restaurant${id}`).addEventListener("click", (event) => {
      if (!event.target.closest(".favorite")) return;

      this.restaurantListManager.toggleFavoriteState(Number(id));
      LocalStorage.setData("list", this.restaurantListManager.getRestaurantList());

      this.restaurantInfo = { ...this.restaurantInfo, favorite: !this.restaurantInfo.favorite };
      event.target.src = `./favorite-icon-${this.restaurantInfo.favorite ? "filled" : "lined"}.png`;
    });
  }
}

export default RestaurantItem;
