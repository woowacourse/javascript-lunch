import translateCategory from "../../../util/translateCategory";
import "./index.css";

class RestaurantDetailModal {
  $target;
  restaurantInfo;

  constructor($target, restaurantInfo) {
    this.$target = $target;
    this.restaurantInfo = restaurantInfo;

    this.render();
  }

  template() {
    return `
    <div class="restaurant-detail-container">
      <div class="category-and-favorite">
        <div class="restaurant__category">
          <img
            src="./category-${translateCategory(this.restaurantInfo.category)}.png"
            alt="${this.restaurantInfo.category}"
            class="category-icon"
          />
        </div>
        <div class="favorite">
          <img
            src="./favorite-icon-${this.restaurantInfo.favorite ? "filled" : "lined"}.png"
            alt="즐겨찾기"
          />
        </div>
      </div>
      <h3 class="restaurant__name text-subtitle detail-subtitle">${this.restaurantInfo.name}</h3>
      <span class="restaurant__distance text-body"
        >캠퍼스부터 ${this.restaurantInfo.distance}분 내</span
      >
      <p class="restaurant__description text-body">
        ${this.restaurantInfo.description}
      </p>
      <a href="${this.restaurantInfo.link}" target="_blank">${this.restaurantInfo.link}</a>
      <div class="button-container">
        <button
          id="detail-delete-button"
          type="button"
          class="button button--primary text-caption"
        >
          삭제하기
        </button>
        <button id="detail-cancel-button" class="button button--secondary text-caption">
          닫기
        </button>
      </div>
    </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setFavoriteToggleEvent() {}

  setDeleteEvent(restaurantList, toggleModal) {}

  setCloseEvent(toggleModal) {
    this.$target.querySelector("#cancel-button").addEventListener("click", toggleModal);
  }
}

export default RestaurantDetailModal;
