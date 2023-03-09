import translateCategory from "../../util/translateCategory";

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
      </li>
        `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }
}

export default RestaurantItem;
