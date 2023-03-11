import "./index.css";
import translateCategory from "../../../util/translateCategory";
import LocalStorage from "../../../util/LocalStorage";

class RestaurantItem {
  $target;
  restaurantInfo;

  constructor($target, restaurantInfo) {
    this.$target = $target;
    this.restaurantInfo = restaurantInfo;

    this.render();
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

  setOnClickFavoriteEvent(restaurantList) {
    this.$target.querySelector(`#restaurant${this.restaurantInfo.id}`).addEventListener("click", (event) => {
      if (!event.target.closest(".favorite")) return;

      restaurantList.changeFavoriteState(this.restaurantInfo.id);
    });
  }

  setOnClickItemEvent(restaurantList) {
    this.$target.querySelector(`#restaurant${this.restaurantInfo.id}`).addEventListener("click", (event) => {
      if (event.target.closest(".favorite")) return;

      restaurantList.modal.renderRestaurantDetail(this.restaurantInfo, restaurantList);
      restaurantList.modal.toggle();
    });
  }

  setEvent(restaurantList) {
    this.setOnClickFavoriteEvent(restaurantList);
    this.setOnClickItemEvent(restaurantList);
  }
}

export default RestaurantItem;
